import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import productService from "../../../../services/product.service";
import ProductCardId from "../../../../components/ProductCardId";
import RecImageSlider from "../../../../components/RecommandationSlider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import ProductCardSlider from "../../../../components/ProductCardSlider";

const Index = () => {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const id = router.query.id;

    productService.getProduct(id)
      .then((data) => {
        setProduct(data.data[0]);
        console.log("the data", data.data[0]);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    let formData = new FormData();
    formData.append("categorie", product && product.categorie.id)
    const result = axios.post("http://localhost:8000/produit/filtre", formData)
      .then((res) => {
        setProducts(res.data.data[0])
      })
      .catch((error) => {
        console.log(error)
      });
  }, [product]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="product_page">
      <ProductCardId
        product={product && product} key={product && product.id} />
      <h2 className="similar__outfits">Similar outfits :</h2>
      {products &&
        <Carousel
          responsive={responsive}
          autoPlay={false}
          shouldResetAutoplay={false}
          infinite={true}
          className="container"
        >
          {products.map((product) => {
            return (<ProductCardSlider product={product} key={product.id} />)
          })}
        </Carousel>}

    </div>
  );
};

export default Index;