import { Filter } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import productService from "../../services/product.service";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Index = () => {
  const [products, setProducts] = useState();
  const [productSearch, setProductSearch] = useState();
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const handleFilter = (e,filterType) => {
    let formData = new FormData();
    formData.append(filterType,e.target.value)
    const result = axios.post("http://localhost:8000/produit/filtre",formData)
    .then((res)=>{
      setProducts(res.data.data[0])
    })
      .catch((error)=>{
      console.log(error)
    })
  }
 

  useEffect(() => {
    if (isSearch === false) {
      productService.getProducts()
        .then((data) => {
          setProducts(data.data);
          console.log(data.data);
        })
        .catch(err => console.log(err))
    }
  }, [isSearch]);

  const search = (e) => {
    let name = e.target.value;
    let formData = new FormData();
    if (name !== "") {
      setIsSearch(true)
      formData.append("name", name);
      const result = axios.post("http://localhost:8000/produit/search", formData).then((res) => {
        console.log(res);
        setProducts(res.data.data[0])
      });
    } else {
      setIsSearch(false);
    }
  }
  useEffect(() => { 
    console.log(productSearch);
  }, [productSearch]);

  return (
    <div className="page__shop">
      <div className="shop__container__top">
        <div className="search__container">
          <div className="search__input">
            <input type="text" id="search" name="search" required="" placeholder="Search here" className="searchbar" onChange={(e) => {setTimeout(() => {
              search(e)
            }, 1500)}}>
            </input>
            <SearchOutlinedIcon className="search__icon"/>
          </div>
          
          <select className="select-filter" name="filter" id="filter-select" onChange={(e)=>handleFilter(e,"ordre")}>
            <option value="">Asc</option>
            <option value="dsc">Dsc</option>
          </select>
        </div>
        <p>Popular filter :</p>
        <div className="filter__container">
          <select className="select-filter" name="colors" id="color-select" onChange={(e)=>handleFilter(e,"couleur")}>
            <option value="">All Colors</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="brown">Brown</option>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
            <option value="multicolor">Multicolor</option>
          </select>
          <select className="select-filter" name="category" id="category-select" onChange={(e)=>handleFilter(e,"categorie")}>
            <option value="">All Categories</option>
            <option value={1}>Shirts</option>
            <option value={3}>Sweaters</option>
            <option value={7}>Jeans</option>
            <option value={6}>Dresses</option>
            <option value={4}>Skirts</option>
            <option value={8}>Shoes</option>
            <option value={2}>Accessories</option>
          </select>
          <select className="select-filter" name="section" id="section-select" onChange={(e)=>handleFilter(e,"section")}>
            <option value="">All Sections</option>
            <option value={1}>Kids</option>
            <option value={2}>Men</option>
            <option value={3}>Women</option>
          </select>
        </div>
      </div>
      <div className="products__grid">
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>

  );
};

export default Index;