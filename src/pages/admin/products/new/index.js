import React, { useState,useContext } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {

  const router = useRouter();
  const [product, setProduct] = useState();


  const submitNewProduct= (e) => {
    console.log("you clicked");
  }
  return (
    <>
      <ToastContainer />
      <div className="newproduct__page">
        <form className="form" onSubmit={(e) => submitLogin(e)}>
          <h1 className="text__center">New product</h1>
          <Input
            label="Name"
            name="name"
            id="name"
            type="text"
            classes="form__input"
            required={true}
            placeholder="Name of the product"
            handleChange={(e) => setProduct({ ...product, nom: e.target.value })}
          />
          <Input
            label="URL of the media"
            name="image"
            id="image"
            type="text"
            classes="form__input"
            required={true}
            placeholder="Link to the image"
            handleChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <Input
            label="Price"
            name="price"
            id="price"
            type="number"
            classes="form__input"
            required={true}
            placeholder="Price"
            handleChange={(e) => setProduct({ ...product, prix: e.target.value })}
          />
          <br /><br />
          <center><Button title="Create" classes="btn btn__color-blue-long" type="submit" /></center>
        </form>
      </div>
    </>
  );
};

export default Index;