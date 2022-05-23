import React, { useState, useContext,useEffect } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Index = () => {

  const router = useRouter();
  const [product, setProduct] = useState();


  const submitNewProduct = (e) => {
    let jwt = localStorage.getItem("jwt")
    let formData = new FormData();
    formData.append("nom",product.nom)
    formData.append("image",product.image)
    formData.append("prix",product.prix)
    formData.append("categorie",product.categorie)
    formData.append("description",product.description)
    formData.append("couleur",product.couleur)
    formData.append("section",product.section)
    const result = axios.post("http://localhost:8000/produit/add",formData,{
      headers: {
          Authorization : `Bearer ${jwt}`
        }
  })
    .then(()=>{})
    .catch((error)=>{
      console.log(error);
    })
    e.preventDefault()
  }
  useEffect(() => {
    
  }, [product]);
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

          <Input
            label="description"
            name="description"
            id="description"
            type="textArea"
            classes="form__input"
            required={true}
            placeholder="description"
            handleChange={(e) => setProduct({ ...product, description: e.target.value })}
          />

          <label>Category :</label>

          <select onChange={(e) => setProduct({ ...product, categorie: e.target.value })} name="category" id="categories">
            <option value={1}>Shirts</option>
            <option value={3}>Sweaters</option>
            <option value={7}>Jeans</option>
            <option value={6}>Dresses</option>
            <option value={4}>Skirts</option>
            <option value={8}>Shoes</option>
            <option value={2}>Accessories</option>
          </select>

          <label>Color :</label>

          <select onChange={(e) => setProduct({ ...product, couleur: e.target.value })} name="color" id="colors">
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="brown">Brown</option>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
            <option value="multicolor">Multicolor</option>
          </select>


          <label>Section :</label> 

          <select onChange={(e) => setProduct({ ...product, section: e.target.value })} name="section" id="section">
            <option value={1}>Kids</option>
            <option value={2}>Men</option>
            <option value={3}>Women</option>
          </select>

          <br /><br />
          <center><Button title="Create" classes="btn btn__color-blue-long" type="submit" /></center>
        </form>
      </div>
    </>
  );
};

export default Index;