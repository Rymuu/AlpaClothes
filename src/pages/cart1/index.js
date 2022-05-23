import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Button from "../../components/Button";
import UserContext from "../../User/UserContext";
import Link from "next/link";

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
        console.log(product);
    };

    const renderTotalAmount = () => {
        return (
            <p>{(cart.reduce((total, product) => total + (product.quantity * product.prix), 0)).toFixed(2)} €</p>
        )
    }
    const totalAmount = () => {
        return (
            (cart.reduce((total, product) => total + (product.quantity * product.prix), 0)).toFixed(2)
        )
    }

    const renderTotalQty = () => {
        return cart.reduce((total, product) => total + product.quantity, 0)
    }

    const getFormData = (object) => {
        const formData = new FormData();
        let panierArray = new Array(1);
        Object.keys(object).forEach(key => {
            panierArray[key] = [object[key].id, object[key].quantity]
        });
        formData.append("panier", panierArray)
        console.log(panierArray);
        return formData;
    }

    const paidCart = () => {
        let jwt = localStorage.getItem("jwt");
        let panier = JSON.parse(localStorage.getItem("cart"))
        var formData = getFormData(panier);
        formData.append("prix", totalAmount())
        axios.post("http://localhost:8000/commande/add", formData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then().catch((error) => {
            console.log(error.response)
        })
    }

    return (
        <div className="page__cart">
            {cart ? (
                <>
                    <div className="body">
                        <div className="Cart-Container">
                            <div className="Header__cart">
                                <h3 className="Heading">Shopping Cart</h3>
                                <h5 className="Action" onClick={deleteCart}>Remove all</h5>
                            </div>
                            {cart &&
                                cart.map((cartItem) => (

                                    <div className="Cart-Items">
                                        <div className="image-box">
                                            <Link href={`/shop/product/${cartItem.id}`}>
                                                <img src={`${cartItem.image}`} alt={cartItem.nom} />
                                            </Link>
                                        </div>
                                        <div className="about">
                                            <h1 className="title">{cartItem.nom}</h1>
                                            <h3 className="subtitle">{cartItem.couleur}</h3>
                                            <h3 className="subtitle">{cartItem.size.libelle}</h3>
                                        </div>
                                        <div className="counter">
                                            <div className="btn" onClick={() => decrementQty(cartItem)}>-</div>
                                            <div className="count">{cartItem.quantity}</div>
                                            <div className="btn" onClick={() => incrementQty(cartItem)}>+</div>
                                        </div>
                                        <div className="prices">
                                            <div className="amount">{cartItem.prix} €</div>
                                            <div className="save"><u>Save for later</u></div>
                                            <div className="remove" onClick={() => deleteProduct(cartItem)}><u>Remove</u></div>
                                        </div>
                                    </div >))}
                            <hr />
                            <div className="checkout">
                                <div className="total">
                                    <div>
                                        <div className="Subtotal">Sub-Total</div>
                                        <div className="items">{renderTotalQty()} items</div>
                                    </div>
                                    <div className="total-amount">{renderTotalAmount()}</div>
                                </div>
                                <button className="button" onClick={paidCart}>Checkout</button>
                            </div >
                        </div >

                    </div >
                </>
            ) : (
                <p className="text__center">Votre panier est vide</p>
            )}
        </div >
    );
};

export default Index;