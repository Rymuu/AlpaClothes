import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductPrice from "../../../../components/ProductPrice"
import Button from "../../../../components/Button";
import productService from "../../../../services/product.service";

const Index = () => {
  const router = useRouter();
  const [product, setProduct] = useState();

  useEffect(() => {
    const id = router.query.id;

    productService.getProduct(id)
      .then((data) => {
      setProduct(data.data[0]);
      console.log(data);
    })
    .catch(err => console.log(err))
    },[]);

  const addTocart = (element) => {
    console.log(product)

    let productToInsert = {
      nom : element.nom,
      id : element.id,
      prix : element.prix,
      image : element.image,
      quantity : 1

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
      if (indice !== -1){
        productToInsert = cartArray[indice];
        productToInsert.quantity += 1;
        //productToInsert.quantity ++;
      }
      else{
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
    <div className="product_page">
      <h1><p>{product && product.nom}</p></h1>
      <img src={`${product && product.image}`} alt={product && product.nom} />
      <div className="text__center">
        <ProductPrice price={product && product.prix} currency="€" />
        <p>{product && product.description}</p>
        <Button
          type="button"
          classes="btn btn__color-black"
          function={() => addTocart(product)}
          title="ajouter au panier"
        />
      </div>
    </div>
  );
};

export default Index;