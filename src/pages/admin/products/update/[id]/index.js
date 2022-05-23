import React, { useState, useContext,useEffect } from "react";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import withAdminAuth from "../../../../HOC/withAdminAuth";

const Index = () => {

  const router = useRouter();
  const [myProduct, setMyProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
      nom:"",
      image:"",
      prix:"",
      categorie:"",
      description:"",
      couleur:"",
  });
  const {id} = router.query;


  const submitNewProduct = (e) => {
    toast.success("Your item has been successfully modified !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    let jwt = localStorage.getItem("jwt")
    let formData = new FormData();
    formData.append("nom",product.nom)
    formData.append("image",product.image)
    formData.append("prix",product.prix)
    formData.append("categorie",product.categorie)
    formData.append("description",product.description)
    formData.append("couleur",product.couleur)
    const result = axios.post(`http://localhost:8000/produit/edit/${id}`,formData,{
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
      if(loading === true){
        axios.get(`http://localhost:8000/produit/${id}`)
        .then((res)=>{
            setMyProduct(res.data.data[0]);
            setLoading(false);
        }) .catch((error)=>{
            console.log(error);
        })
      }
    console.log(myProduct);
  }, [myProduct,loading]);


  return (
    <>
      <ToastContainer />
      <div className="newproduct__page">
        <form className="form" onSubmit={(e) => submitNewProduct(e)}>
            { loading === false ? (<> <h1 className="text__center">{myProduct.nom}</h1>
          <Input
            label="Name"
            name="name"
            id="name"
            type="text"
            classes="form__input"
            required={true}
            placeholder="Name of the product"
            defaultValue={myProduct.nom}
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
            defaultValue={myProduct.image}
            handleChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <Input
            label="Price"
            name="price"
            id="price"
            type="number"
            step={"any"}
            classes="form__input"
            required={true}
            placeholder="Price"
            defaultValue={myProduct.prix}
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
            defaultValue={myProduct.description}
            handleChange={(e) => setProduct({ ...product, description: e.target.value })}
          />

          <label>Category :</label>

          <select defaultValue={myProduct.categorie.id} onChange={(e) => setProduct({ ...product, categorie: e.target.value })} name="category" id="categories">
            <option value={1}>Shirts</option>
            <option value={3}>Sweaters</option>
            <option value={7}>Jeans</option>
            <option value={6}>Dresses</option>
            <option value={4}>Skirts</option>
            <option value={8}>Shoes</option>
            <option value={2}>Accessories</option>
          </select>

          <label>Color :</label>

          <select defaultValue={myProduct.couleur} onChange={(e) => setProduct({ ...product, couleur: e.target.value })} name="color" id="colors">
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
          </>
          ):(<>loading</>)
            }
          <br /><br />
          <center><Button title="update" classes="btn btn__color-blue-long" type="submit" /></center>
        </form>
      </div>
    </>
  );
};

export default withAdminAuth(Index);