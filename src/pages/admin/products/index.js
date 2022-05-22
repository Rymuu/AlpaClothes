import List from "../../../components/List";
import { useEffect, useState } from "react";
import productService from "../../../services/product.service";
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [products, setProducts] = useState();

  useEffect(() => {
    productService.getProducts()
      .then((data) => {
        setProducts(data.data);
        console.log(data.data);
      })
      .catch(err => console.log(err))


  }, [products]);
  return (
    <div>
      <br />
      <center>
        <button className="btn btn__color-black" onClick={() => router.push(`/admin/products/new`)}>Create a new product</button>
      </center>
      <br />
      {products &&
        products.map((product) => (
          <List product={product} key={product.id} />
        ))}
    </div>
  );
}

export default Index;