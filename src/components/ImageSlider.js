import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Alpaguette from "../public/sliderhome/alpaguette.jpg";
import Alpatocrate from "../public/sliderhome/alpatocrate.jpeg";
import Cosplay from "../public/sliderhome/cosplay.jpg";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={Alpaguette.src} onDragStart={handleDragStart} role="presentation" className='slider__img'/>,
  <img src={Alpatocrate.src} onDragStart={handleDragStart} role="presentation" className='slider__img'/>,
  <img src={Cosplay.src} onDragStart={handleDragStart} role="presentation" className='slider__img'/>,
];

const ImageSlider = () => {
  return (
    <AliceCarousel 
    mouseTracking items={items} 
    autoPlay autoPlayInterval="6000"
    disableButtonsControls
    infinite/>
  );
}

export default ImageSlider;