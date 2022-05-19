
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import withAuth from "../../HOC/withAuth";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import UserContext from "../../User/UserContext"

const Index = () => {

  const router = useRouter();
  const user = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('jwt');
    router.push("/login")
    }

  useEffect(() => {
  }, [user]);

  return (
    <>
    <div className="profil">
    </div>
    <Button type="button"
          classes="btn btn__color-black"
          function={logout}
          title="Déconnexion" />
    <h1>Bienvenue {user.user && user.user.pseudo} !</h1>
    </>
  );
}

export default withAuth(Index);