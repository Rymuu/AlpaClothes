import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import axios from "axios";

const Index = () => {

  const router = useRouter();
  const [user, setUser] = useState();

  const linkColor = {
    color: "rgb(68, 156, 169)",
    fontWeight: "bold"
  };

  const submitLogin = (e) => {
    console.log("submitted !");
  }
  return (
    <div className="page__login">
      <div className="background_image"></div>
      <div className="form__opacity"></div>
      <form className="form" onSubmit={(e) => submitLogin(e)}>
        <h1 className="text__center">Login</h1>
        <Input
          label="Username or email"
          name="username"
          id="username"
          type="text"
          classes="form__input"
          required={true}
          placeholder="Enter your username or email"
          handleChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          classes="form__input"
          required={true}
          placeholder="Enter your password"
          handleChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <a>You don't have an account ? </a><a style={linkColor} href="/register">Register.</a>
        <center><Button title="login" classes="btn btn__color-blue-long" type="submit" /></center>
        <a style={linkColor}>Forgot password ?</a>
      </form>
    </div>
  );
};

export default Index;