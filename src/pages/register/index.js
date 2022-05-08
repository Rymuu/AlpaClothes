import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import axios from "axios";
import Modal from "../../components/Modal";

const Index = () => {

  const router = useRouter();
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const submitRegister = (e) => {
    axios
  .post('http://localhost:1337/api/auth/local/register', {
    username: user.username,
    email: user.email,
    password: user.password,
  })
  .then(response => {
    // Handle success.
    if(response.data.error) {
      setShowModal(true)
    } else {
      localStorage.setItem('jwt', response.data.jwt);
      router.push("/profil")
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
      <Modal title = "Titre Modal" isActive={showModal} isInfo = {false} closefunction = {() => setShowModal(!showModal)}>
        <p>kesta foutu bro ya une erreur a ta plass jrelirai les zinfo du formulair</p>
      </Modal>
      <form className="form" onSubmit={(e)=> submitRegister(e)}>
        <Input
          label="Pseudo"
          name="userName"
          id="userName"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Veuillez saisir votre pseudo"
          handleChange={(e) => setUser({...user, username : e.target.value})}
        />
          <Input
          label="Adresse email"
          name="email"
          id="email"
          type="email"
          classes="form__input"
          required={true}
          placeholder="Veuillez saisir votre email"
          handleChange={(e) => setUser({...user, email : e.target.value})}
              />
          <Input
          label="Mot de passe"
          name="password"
          id="password"
          type="password"
          classes="form__input"
          required={true}
          placeholder="Veuillez saisir un mot de passe"
          handleChange={(e) => setUser({...user, password : e.target.value})}
              />
        <Button title="envoyer" classes="btn btn__color-black" type="submit"/>
      </form>
    </div>
  );
};

export default Index;