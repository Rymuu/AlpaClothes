import TitlePage from "../../components/TitlePage/TitlePage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import withAuth from "../../HOC/withAuth";
import Button from "../../components/Button";
import { useRouter } from 'next/router';

const Index = () => {

  const router = useRouter();
  const [user, setUser] = useState();

  const logout = () => {
    localStorage.removeItem('jwt');
    router.push("/login")
    }

  useEffect(() => {

    let jwtUser = localStorage.getItem('jwt');

    axios
    .get('http://localhost:1337/api/users/me',{
      headers : {
        Authorization : `Bearer ${jwtUser}`
      }
    })
    .then(response => {
      setUser(response.data)
      console.log(response)
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
  }, []);

  return (
    <>
    <div className="profil">
      <TitlePage title="Profil" />
    </div>
    <Button type="button"
          classes="btn btn__color-black"
          function={logout}
          title="Déconnexion" />
    <h1>Bienvenue {user && user.username} !</h1>
    </>
  );
}

export default withAuth(Index);