import Link from "next/link";
import Button from "../components/Button";

const Productcard = (props) => {

  const addTocart = (element) => {
    console.log(props.product)

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
    <div className="product__card">
      <div className="product__img">
        <Link href={`/shop/product/${props.product.id}`}>
          <img src={`${props.product.image}`} alt={props.product.nom} />
        </Link>
      </div>
      <div className="product__data">
        <h2>{props.product.nom}</h2>
        <p>{props.product.prix} € </p>
      </div>
      <Button title="ajouter au panier" function={() => addTocart(props.product)} type="button" classes="btn btn__color-black-long" />
    </div>
  );
}

export default Productcard;