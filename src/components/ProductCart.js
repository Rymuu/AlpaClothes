

const ProductCart = (props) => {
    return (
        <div className="product__cart">
              <div>
                <img className="product__img" src={props.product.image} alt={props.product.title} />
             

                <h2 className="product__data">{props.product.title}</h2>
                <p className="product__price">{props.product.price} € </p>
                <p>

                  <button className="btn btn__color-black">Ajouter</button>
                </p>
              </div>
            </div>
    );
}

export default ProductCart;