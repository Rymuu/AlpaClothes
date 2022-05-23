import List from "../../../components/List";
import { useEffect, useState } from "react";
import productService from "../../../services/product.service";
import { useRouter } from 'next/router';
import withAdminAuth from "../../../HOC/withAdminAuth";

const Index = () => {
  const router = useRouter();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading === true){
       productService.getProducts()
      .then((data) => {
        setProducts(data.data);
        setLoading(false)
        console.log(data.data);
      })
      .catch(err => console.log(err))
    }
  }, [loading]);
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

export default withAdminAuth(Index);