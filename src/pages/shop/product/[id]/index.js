import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import productService from "../../../../services/product.service";
import ProductCardId from "../../../../components/ProductCardId";
import RecImageSlider from "../../../../components/RecommandationSlider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import ProductCardSlider from '../../../../components/ProductCardSlider';


const Index = () => {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();

  useEffect(() => {
    const id = router.query.id;
    if(loading === true){
      productService.getProduct(id)
      .then((data) => {
        setProduct(data.data[0]);
        setLoading(false)
        console.log("the data", data.data[0]);
      })
      .catch(err => console.log(err))
    }
    
  }, [loading]);

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
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        shouldResetAutoplay={false}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="list_movies carousel-item-padding-5-px">
        <div className="products__grid">
              {products &&
                products.map((product) => 
                {
                  return <ProductCardSlider product={product} key={product.id} />
                })}
          </div>
      </Carousel>;
    </div>
  );
};

export default Index;