import Link from "next/link";
import {addToCart} from "../pages/shop/[id]/index"
import Button from "./Button";

const Productcard = (props) => {
    return (
        <div className="product__card">
              <div className="product__img">
                <img src={`http://localhost:1337${props.product.attributes.image.data.attributes.url}`} alt={props.product.attributes.name} />
              </div>
              <div className="product__data">
                <h2>{props.product.attributes.name}</h2>
                <p>
                  <Link href={`/shop/${props.product.id}`}>
                  {/* <Link href={'/shop/' + props.product.id} */}
                    <a>
                      Voir le produit
                    </a>
                  </Link>
                  <Button
          type="button"
          classes="btn btn__color-black"
          function={() => addToCart(props.product.attributes)}
          title="ajouter au panier"
        />
                </p>
              </div>
            </div>
    );
}

export default Productcard;