
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

const Index = () => {
  const [cart, setCart] = useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) : []);
  const [total, setTotal] = useState(0);

  const deleteCart = () => {
    localStorage.removeItem('cart');
    setCart(null);
  };

    useEffect(()=>{
        setTotal((cart.reduce((total, product) => total + (product.quantity * product.price), 0)).toFixed(2));
    }, []);


  const incrementQty = (product) => {
    
          const indice = cart.findIndex((el) => el.id === product.id);

          if (indice !== -1){
            cart[indice].quantity += 1;
            
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          setCart(JSON.parse(localStorage.getItem('cart')))

      };
  

  const decrementQty = (product) => {
    const indice = cart.findIndex((el) => el.id === product.id);

    if (indice !== -1 && cart[indice].quantity > 1){
      cart[indice].quantity -= 1;
      
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(JSON.parse(localStorage.getItem('cart')))

};


    const deleteProduct = (product) => {
      const filteredCart = cart.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      setCart(filteredCart);
}

  const renderTotalAmount = () => {
      return (
          <p>Montant total : {cart.reduce((total, product) => total + (product.quantity * product.price),0)}</p>
            )
  }

  

  const renderTotalQty = () => {
      return(
          cart.reduce((total, product) =>  total + product.quantity,0)
      )
      
}

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  return (
    <div className="page__cart">
      {cart ? (
        <>
        <p>Vous avez {renderTotalQty()} articles dans votre panier</p>
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.title}</td>
                  <td>{cartItem.price}</td>
                  <td>
                      <Button 
                        title = "-"
                        type="button"
                        function={() => decrementQty(cartItem)}
                        />
                        {cartItem.quantity}
                    <Button 
                        title = "+"
                        type="button"
                        function={() => incrementQty(cartItem)}
                    />
                  </td>
                  <td>{(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                    {/* .Filter() */}
                  <td><Button 
                        title = "Supprimer"
                        type="button"
                        function={() => deleteProduct(cartItem)}
                    /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* .reduce() */}
          {renderTotalAmount()}
          <Button
            title="Supprimer le panier"
            classes="btn btn__color-white"
            type="button"
            function={deleteCart}
          />
        </>
      ) : (
        <p className="text__center">Votre panier est vide</p>
      )}
    </div>
  );
};

export default Index;