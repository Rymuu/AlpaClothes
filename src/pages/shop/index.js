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
            <input type="text" id="search" name="search" required="" placeholder="Search here" class="searchbar" onChange={(e) => {
              setTimeout(() => {
                search(e)
              }, 1000)
            }}>
            </input>
            <SearchOutlinedIcon className="search__icon"/>
          </div>
          
          <select className="select-filter" name="filter" id="filter-select">
            <option value="">Asc</option>
            <option value="asc">Asc</option>
            <option value="dsc">Dsc</option>
          </select>
        </div>
        <p>Popular filter :</p>
        <div className="filter__container">
          <select className="select-filter" name="colors" id="color-select">
            <option value="">Colors</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
          <select className="select-filter" name="size" id="size-select">
            <option value="">Size</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </select>
          <select className="select-filter" name="category" id="category-select">
            <option value="">Category</option>
            <option value="coat">Coat</option>
            <option value="hoodie">Hoodie</option>
            <option value="jean">Jean</option>
            <option value="dress">Dress</option>
            <option value="shoes">Shoes</option>
          </select>
          <select className="select-filter" name="section" id="section-select">
            <option value="">Section</option>
            <option value="kids">Kids</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
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