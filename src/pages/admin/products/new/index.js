import React, { useState, useContext } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {

  const router = useRouter();
  const [product, setProduct] = useState();


  const submitNewProduct = (e) => {
    console.log(product);
  }
  return (
    <>
      <ToastContainer />
      <div className="newproduct__page">
        <form className="form" onSubmit={(e) => submitNewProduct(e)}>
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

          <label>Category :</label>

          <select onChange={(e) => setProduct({ ...product, categorie: e.target.value })} name="category" id="categories">
            <option value="shoes">Shoes</option>
            <option value="pants/Skirts/Dresses">Pants/Skirts/Dresses</option>
            <option value="accessories">Accessories</option>
            <option value="shirt">Shirt</option>
            <option value="hoodie">Hoodie</option>
          </select>

          <label>Color :</label>

          <select onChange={(e) => setProduct({ ...product, couleur: e.target.value })} name="color" id="colors">
            <option value="blue">Blue</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
            <option value="multicolor">Multicolor</option>
          </select>



          <label>Section :</label>

          <select onChange={(e) => setProduct({ ...product, section: e.target.value })} name="section" id="section">
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          <br /><br />
          <center><Button title="Create" classes="btn btn__color-blue-long" type="submit" /></center>
        </form>
      </div>
    </>
  );
};

export default Index;