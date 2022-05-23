import Link from "next/link";
import Button from "../components/Button";

const ProductCardSlider = (props) => {

  return (
    <div className="product__slider__card">
      <div className="product__slider__img">
        <Link href={`/shop/product/${props.product.id}`}>
          <img src={`${props.product.image}`} alt={props.product.nom} />
        </Link>
      </div>
      <div className="product__slider__data">
        <h2>{props.product.nom}</h2>
        <p>{props.product.prix} € </p>
      </div>
    </div>
  );
}

export default ProductCardSlider;