import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import axios from "axios";

const Index = () => {

  const router = useRouter();
  const [user, setUser] = useState();
  const submitLogin = (e) => {
    console.log("submitted !");
    }
  return (
    <div className="page__login">
      <form className="form" onSubmit={(e)=> submitLogin(e)}>

          <Input
          label="Identifiant"
          name="username"
          id="username"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Veuillez saisir votre identifiant"
          handleChange={(e) => setUser({...user, username : e.target.value})}
              />
          <Input
          label="Mot de passe"
          name="password"
          id="password"
          type="password"
          classes="form__input"
          required={true}
          placeholder="Veuillez saisir votre mot de passe"
          handleChange={(e) => setUser({...user, password : e.target.value})}
              />
        <Button title="envoyer" classes="btn btn__color-black" type="submit"/>
      </form>
    </div>
  );
};

export default Index;