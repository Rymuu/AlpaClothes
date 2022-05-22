import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import productService from "../../../../services/product.service";
import ProductCardId from "../../../../components/ProductCardId";

const Index = () => {
  const router = useRouter();
  const [product, setProduct] = useState();

  useEffect(() => {
    const id = router.query.id;

    productService.getProduct(id)
      .then((data) => {
      setProduct(data.data[0]);
      console.log("the data",data.data[0]);
    })
    .catch(err => console.log(err))
    },[]);

  return (
    <div className="product_page">
      <ProductCardId 
      product={product && product} key={product && product.id}/>
    </div>
  );
};

export default Index;