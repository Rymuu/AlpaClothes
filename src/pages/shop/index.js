import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import productService from "../../services/product.service";

const Index = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    productService.getProducts()
      .then((data) => {
        setProducts(data.data);
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <div className="page__shop">
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