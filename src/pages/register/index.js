import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import axios from "axios";
import Modal from "../../components/Modal";
import { fontWeight } from "@mui/system";

const Index = () => {

  const router = useRouter();
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);

  const linkColor = {
    color: "rgb(68, 156, 169)",
    fontWeight: "bold"
  };

  const submitRegister = (e) => {
    axios
      .post('http://localhost:8000/client/add', {
        pseudo: user.pseudo,
        email: user.email,
        password: user.password,
        nom: user.nom,
        prenom: user.prenom,
        dateNaissance: user.dateNaissance
      })
      .then(response => {
        // Handle success.
        if (response.data.error) {
          console.log(response);
          setShowModal(true)
        } else {
          localStorage.setItem('jwt', response.data.jwt);
          router.push("/profil")
          console.log(response);
        }
        console.log('User profile', response.data.user);

      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
        setShowModal(true);
      });
    console.log(e);
    e.preventDefault();
    console.log("send");
    console.log(user);
  }

  return (
    <div className="page__register">
      <div className="background_image"></div>
      <div className="form__opacity__register"></div>
      <Modal title="Titre Modal" isActive={showModal} isInfo={false} closefunction={() => setShowModal(!showModal)}>
        <p>kesta foutu bro ya une erreur a ta plass jrelirai les zinfo du formulair</p>
      </Modal>
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