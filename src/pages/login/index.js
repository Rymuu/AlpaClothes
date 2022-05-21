import React, { useState,useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import UserContext from "../../User/UserContext";

const Index = () => {

  const router = useRouter();
  const [user, setUser] = useState();
  const {login} = useContext(UserContext);

  const linkColor = {
    color: "rgb(68, 156, 169)",
    fontWeight: "bold"
  };

  const submitLogin = (e) => {
    axios
      .post('http://localhost:8000/api/client/login_check',
        {
          username: user.username,
          password: user.password
        }
      )
      .then(response => {
        // Handle success.
        if (response.data.error) {
          console.log(response);
        } else {
          localStorage.setItem('jwt', response.data.token);
          router.push("/account");
        }
        console.log('User profile', response.data.user);
        login(localStorage.getItem("jwt"));
      })
      .catch(error => {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Handle error.
        console.log('An error occurred:', error.response);
      });
    console.log(e);
    e.preventDefault();
  }
  return (
    <>
      <ToastContainer />
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
          <br /><br />
          <center><Button title="login" classes="btn btn__color-blue-long" type="submit" /></center>
          <a style={linkColor}>Forgot password ?</a>
        </form>
      </div>
    </>
  );
};

export default Index;