import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const notify = () => toast.success('Your account has been successfully created !', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const router = useRouter();
  const [user, setUser] = useState();

  const linkColor = {
    color: "rgb(68, 156, 169)",
    fontWeight: "bold"
  };

  const submitRegister = (e) => {
    var formData = new FormData();
    formData.append("pseudo", user.pseudo)
    formData.append("email", user.email)
    formData.append("password", user.password)
    formData.append("nom", user.nom)
    formData.append("prenom", user.prenom)
    formData.append("dateNaissance", user.dateNaissance)
    axios
      .post('http://localhost:8000/client/add',
        formData
      )
      .then(response => {
        // Handle success.
        if (response.data.error) {
          console.log(response);
        } else {
          notify();
          setTimeout(() => {router.push("/login")}, 5000)
          console.log(response);
        }
        console.log('User profile', response.data.user);

      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
        toast.error(`${error.response.data.error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    console.log(e);
    e.preventDefault();
    console.log("send");
    console.log(user);
  }

  return (
    <div className="page__register">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div className="background_image"></div>
      <div className="form__opacity__register"></div>
      <form className="form" onSubmit={(e) => submitRegister(e)}>
        <h1 className="text__center">Register</h1>
        <Input
          label="Firstname"
          name="Firstname"
          id="Firstname"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Firstname"
          handleChange={(e) => setUser({ ...user, prenom: e.target.value })}
        />
        <Input
          label="Lastname"
          name="Lastname"
          id="Lastname"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Lastname"
          handleChange={(e) => setUser({ ...user, nom: e.target.value })}

        />
        <Input
          label="Username"
          name="userName"
          id="userName"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Username"
          handleChange={(e) => setUser({ ...user, pseudo: e.target.value })}
        />
        <Input
          label="Birthdate"
          name="Birthdate"
          id="Birthdate"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Birthdate"
          handleChange={(e) => setUser({ ...user, dateNaissance: e.target.value })}
        />
        <Input
          label="Email"
          name="email"
          id="email"
          type="email"
          classes="form__input"
          required={true}
          placeholder="example@example.com"
          handleChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          classes="form__input"
          required={true}
          placeholder="Minimum 8 characters"
          handleChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button title="register" classes="btn btn__color-blue-long" type="submit" />
        <a>You already have an account ? </a><a style={linkColor} href="/login">Login.</a>
      </form>
    </div>
  );
};

export default Index;