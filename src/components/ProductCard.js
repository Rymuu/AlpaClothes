import Link from "next/link";
import {addToCart} from "../pages/shop/[id]/index";
import Button from "./Button";

const Productcard = (props) => {
    return (
        <div className="product__card">
              <div className="product__img">
              </div>
              <div className="product__data">
                <h2>Alpaca Ribbon</h2>
                <p>100€ </p>
                <p>
                  <Link href={`/shop/1`}>
                  {/* <Link href={'/shop/' + props.product.id} */}
                    <a>
                      Voir le produit
                    </a>
                  </Link>
                  <Button
          type="button"
          classes="btn btn__color-black"
          function={() => addToCart("Alpaca Ribbon")}
          title="ajouter au panier"
        />
                </p>
              </div>
            </div>
    );
}

export default Productcard;