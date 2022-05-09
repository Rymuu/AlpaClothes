import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import FirstImg from "../public/sliderhome/1.png";
import SecondImg from "../public/sliderhome/2.png";
import ThirdImg from "../public/sliderhome/3.png";
import FourthImg from "../public/sliderhome/4.png";
import { useRouter } from "next/router";

const ImageSlider = () => {
    const router = useRouter();

    const handleDragStart = (e) => e.preventDefault();

    const items = [
        <img src={FirstImg.src} onDragStart={handleDragStart} role="presentation" className='slider__img' onClick={() => router.push("/shop")} />,
        <img src={SecondImg.src} onDragStart={handleDragStart} role="presentation" className='slider__img' onClick={() => router.push("/shop/men")} />,
        <img src={ThirdImg.src} onDragStart={handleDragStart} role="presentation" className='slider__img' onClick={() => router.push("/shop/women")} />,
        <img src={FourthImg.src} onDragStart={handleDragStart} role="presentation" className='slider__img' onClick={() => router.push("/sale")} />,
    ];

    return (
        <AliceCarousel
            mouseTracking items={items}
            autoPlay autoPlayInterval="6000"
            disableButtonsControls
            infinite />
    );
}

export default ImageSlider;