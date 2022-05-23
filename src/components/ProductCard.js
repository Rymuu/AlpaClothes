import Link from "next/link";
import { React, useState } from "react";
import Button from "../components/Button";

const Productcard = (props) => {
  const [size, setSize] = useState({
    size: 1,
    libelle:"S",
  });
  const addTocart = (element) => {
    console.log(size);
    console.log(props.product)

    let productToInsert = {
      nom: element.nom,
      id: element.id,
      prix: element.prix,
      image: element.image,
      size: size,
      couleur: element.couleur,
      quantity: 1

    };

    const cartArray = [];

    //si j'ai déjà un ou des produit dans le localstorage
    if (localStorage.getItem('cart')) {
      const localStorageCart = JSON.parse(localStorage.getItem('cart'));
      localStorageCart.forEach(product => {
        cartArray.push(product);
      });
      const indice = cartArray.findIndex((product) => product.id === productToInsert.id)
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
    <div className="product__card">
      <div className="product__img">
        <Link href={`/shop/product/${props.product.id}`}>
          <img src={`${props.product.image}`} alt={props.product.nom} />
        </Link>
      </div>
      <div className="product__data">
        <h2>{props.product.nom}</h2>
        <div className="container_price_size"><p>{props.product.prix} € </p>
        <select className="size" onChange={(e)=>{ setSize({size: e.target.value, libelle: e.target.options[e.target.selectedIndex].text})}}>{props.product.stockTailles?.map((taille)=>{return <option value={taille.taille.id}>{taille.taille.libelle}</option>})}</select></div>
      </div>
      <div className="product__button">
        <Button title="ajouter au panier" function={() => addTocart(props.product)} type="button" classes="btn btn__color-black-long" />
      </div>
    </div>
  );
}

export default Productcard;