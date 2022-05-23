import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import productService from '../services/product.service';
import { useEffect, useState } from "react";
import ProductCardSlider from './ProductCardSlider';


const RecImageSlider = (props) => {

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

        <div className="products__grid">
            {props.products &&
                props.products.map((product) => (
                    <ProductCardSlider product={product} key={product.id} />
                ))}
        </div>
    );
};

export default RecImageSlider;