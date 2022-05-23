import Link from "next/link";
import { React, useState } from "react";
import Button from "./Button";
import ProductPrice from "./ProductPrice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCardId = (props) => {
    console.log(props.product)
    const [size, setSize] = useState({
        size: 1,
        libelle: "S",
    });
    const addTocart = (element) => {
        toast.success(`${element.nom} has been successfully added to your cart !`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.log(size);
        console.log(props.product)

        let productToInsert = {
            nom: element.nom,
            id: element.id,
            prix: element.prix,
            image: element.image,
            couleur: element.couleur,
            size: size,
            quantity: 1

        };
        const cartArray = [];

        //si j'ai déjà un ou des produit dans le localstorage
        if (localStorage.getItem('cart')) {
            const localStorageCart = JSON.parse(localStorage.getItem('cart'));
            localStorageCart.forEach(product => {
                cartArray.push(product);
            });
            const indice = cartArray.findIndex((product) => product.id === productToInsert.id && product.size.size === productToInsert.size.size)
            //si le produit est déjà dans le panier
            if (indice !== -1) {
                productToInsert = cartArray[indice];
                productToInsert.quantity += 1;
                //productToInsert.quantity ++;
            }
            else {
                cartArray.push(productToInsert);
            }

            localStorage.setItem('cart', JSON.stringify(cartArray));

        }
        //si localstorage vide
        else {

            cartArray.push(productToInsert);
            localStorage.setItem('cart', JSON.stringify(cartArray));
        }
    };
    return (
        <div className="product__id">
            <ToastContainer />
            <div className="container__id">
                <img src={`${props.product && props.product.image}`} alt={props.product && props.product.nom} />
                <div className="product__id__data">
                    <h1>{props.product && props.product.nom}</h1>
                    <ProductPrice price={props.product && props.product.prix} currency="€" />
                    <p>{props.product && props.product.description}</p>
                    <p>Color : {props.product && props.product.couleur}</p>
                    <label>Size : </label>
                    <select className="size" onChange={(e) => { setSize({ size: e.target.value, libelle: e.target.options[e.target.selectedIndex].text }) }}>{props.product?.stockTailles.map((taille) => { return <option value={taille.taille.id}>{taille.taille.libelle}</option> })}</select>
                    <br />
                    <p>Material : Cotton</p>
                    <p>Style : Casual</p>
                    <Button
                        type="button"
                        classes="btn btn__color-black"
                        function={() => addTocart(props.product)}
                        title="ajouter au panier"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductCardId;