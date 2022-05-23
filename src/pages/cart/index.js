import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Button from "../../components/Button";
import UserContext from "../../User/UserContext";

const Index = () => {
  const [cart, setCart] = useState();
  const state = useContext(UserContext);

  const deleteCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const decrementQty = (product) => {
    const indexOfExistingProduct = cart.findIndex((el) => el.id === product.id); 
    if (indexOfExistingProduct !== -1 && cart[indexOfExistingProduct].quantity > 1) {
        cart[indexOfExistingProduct].quantity -= 1;    
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(JSON.parse(localStorage.getItem('cart')));
    }
  };
  const incrementQty = (product) => {
    const indexOfExistingProduct = cart.findIndex((el) => el.id === product.id);
    if (indexOfExistingProduct !== -1) {
      cart[indexOfExistingProduct].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(JSON.parse(localStorage.getItem('cart')));
  };

  const deleteProduct = (product) => {
    const filteredCart = cart.filter((item) => item.id != product.id);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setCart(filteredCart);
  };

  const renderTotalAmount = () => {
    return (
      <p>Montant total : {(cart.reduce((total, product) => total + (product.quantity * product.prix),0)).toFixed(2)} €</p>
    )
  }
  const totalAmount = () => {
    return (
      (cart.reduce((total, product) => total + (product.quantity * product.prix),0)).toFixed(2)
    )
  }

  const renderTotalQty = () => {
    return cart.reduce((total, product) => total + product.quantity,0)
  }
  
  const getFormData = (object) => {
      const formData = new FormData();
      let panierArray = [];
      Object.keys(object).forEach(key => {
            //panierArray[key]= [object[key].id,object[key].quantity]
            formData.append(`panier[${[key]}][produit]`, object[key].id)
            formData.append(`panier[${[key]}][size]`, object[key].size)
            formData.append(`panier[${[key]}][qte]`, object[key].quantity)
        });
        
        console.log(panierArray);
      return formData;
  }

  const paidCart = () => {
    let jwt = localStorage.getItem("jwt");
    let panier = JSON.parse(localStorage.getItem("cart"))
    var formData = getFormData(panier);
    formData.append("prix",totalAmount())
    axios.post("http://localhost:8000/commande/add",formData,{
      headers : {
      Authorization : `Bearer ${jwt}`
      }
    }).then().catch((error) =>{
      console.log(error.response)
    })
  }

  return (
    <div className="page__cart">
      {cart ? (
        <>
        
          <p>Vous avez {renderTotalQty()} produits dans votre panier</p>
          <table>
            <thead>
              <tr>
                <th>Shopping Cart</th>
                <th></th>
                <th></th>
                <th></th>
                <th>Delete All</th>
              </tr>
            </thead>
            <br/>
            <tbody>
              {cart.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td><img src={`${cartItem.image}`} alt={cartItem.nom} /></td>
                  <td>{cartItem.nom}</td>
                  <td>{cartItem.prix}</td>
                  <td>
                    <button onClick={() => decrementQty(cartItem)}>-</button>
                    {cartItem.quantity}
                    <button onClick={() => incrementQty(cartItem)}>+</button>
                  </td>
                  <td>{(cartItem.prix * cartItem.quantity).toFixed(2)}</td>
                  {/* .Filter() */}
                  <td>
                    <button onClick={()=>deleteProduct(cartItem)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            title="Supprimer le panier"
            classes="btn btn__color-white"
            type="button"
            function={deleteCart}
          />
          <Button
            title="Payer"
            classes="btn btn__color-white"
            type="button"
            function={paidCart}
          />
          {renderTotalAmount()}
        </>
      ) : (
        <p className="text__center">Votre panier est vide</p>
      )}
    </div>
  );
};

export default Index;