import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Alpaguette from "../public/sliderhome/alpaguette.jpg";
import Alpatocrate from "../public/sliderhome/alpatocrate.jpeg";
import Cosplay from "../public/sliderhome/cosplay.jpg";

const responsive = {
  0: { items: 2 },
  568: { items: 4 },
  1024: { items: 6 },
};

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={Alpaguette.src} onDragStart={handleDragStart} role="presentation" className='slider__product__img'/>,
  <img src={Alpatocrate.src} onDragStart={handleDragStart} role="presentation" className='slider__product__img'/>,
  <img src={Cosplay.src} onDragStart={handleDragStart} role="presentation" className='slider__product__img'/>,
  <img src={Alpaguette.src} onDragStart={handleDragStart} role="presentation" className='slider__product__img'/>,
  <img src={Alpatocrate.src} onDragStart={handleDragStart} role="presentation" className='slider__product__img'/>,
  <img src={Cosplay.src} onDragStart={handleDragStart} role="presentation" className='slider__product__img'/>,
];

const ProductSlider = () => {
  return (
    <AliceCarousel 
    mouseTracking items={items} 
    autoPlay autoPlayInterval="3000"
    disableButtonsControls
    infinite
    responsive={responsive}/>
  );
}

export default ProductSlider;