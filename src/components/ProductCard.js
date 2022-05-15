import Link from "next/link";
import Button from "../components/Button";

const Productcard = (props) => {

  const addTocart = (element) => {
    const cartArray = [];
    if (localStorage.getItem('cart')) {
      const localStorageCart = JSON.parse(localStorage.getItem('cart'));
      localStorageCart.forEach(product => {
        cartArray.push(product);
      });
      cartArray.push(element);
      console.log(cartArray);
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
    else {
      cartArray.push(element);
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
        <Button title="ajouter au panier" function={() => addTocart(props.product)} type="button" classes="btn btn__color-black" />
      </div>
    </div>
  );
}

export default Productcard;