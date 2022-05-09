import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dress from "../public/categories/dress.jpg";
import Skirt from "../public/categories/skirt.jpg";
import Coat from "../public/categories/coat.jpg";
import Shirt from "../public/categories/shirt.jpg";
import Pull from "../public/categories/pull.jpg";
import Short from "../public/categories/short.jpg";
import Shoes from "../public/categories/shoes.jpg";
import Accessories from "../public/categories/hat.jpg";
import Categories from "../public/categories/categories.png";

const CategoryGrid = () => {
    const router = useRouter();

    return (
        <>
            <img src={Categories.src} className="grid__categories__cell__1" />
            <div className="grid__categories">
                <div className="grid__categories__cell">
                    <img src={Dress.src} onClick={() => router.push("/shop/dress")} />
                    <p>Dresses</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Skirt.src} onClick={() => router.push("/shop/skirt")} />
                    <p>Skirts</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Coat.src} onClick={() => router.push("/shop/coat")} />
                    <p>Coats</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Shirt.src} onClick={() => router.push("/shop/shirt")} />
                    <p>Shirts</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Pull.src} onClick={() => router.push("/shop/pull")} />
                    <p>Hoodies</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Short.src} onClick={() => router.push("/shop/short")} />
                    <p>Shorts</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Shoes.src} onClick={() => router.push("/shop/shoes")} />
                    <p>Shoes</p>
                </div>
                <div className="grid__categories__cell">
                    <img src={Accessories.src} onClick={() => router.push("/shop/accessories")} />
                    <p>Accessories</p>
                </div>
            </div>
        </>
    );
};

export default CategoryGrid;