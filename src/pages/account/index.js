
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import withAuth from "../../HOC/withAuth";
import Button from "../../components/Button";
import { useRouter } from 'next/router';
import UserContext from "../../User/UserContext"

const Index = () => {
  const [loading, setloading] = useState(true);
  const [userCommande, setUserCommande] = useState([]);
  const router = useRouter();
  const user = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('jwt');
    router.push("/login")
    }

  const formatDate = (date) => {
    let newDate = new Date(date)
    let day = newDate.getDay();
    let month = newDate.getMonth();
    if( day < 10){
      day = "0"+ day;
    }
    if(month < 10){
      month = "0"+month;
    }
    let formatedDate = newDate.getFullYear()+"-"+month+"-"+day;
    return formatedDate;
  }

  useEffect(() => {
    const getCommande = () =>{
      let jwt = localStorage.getItem("jwt");
      const result = axios.get("http://localhost:8000/client/commande",{
        headers: {
          Authorization : `Bearer ${jwt}`
        }
      }).then((res)=>{
        setUserCommande(res.data.data)
        setloading(false)
      })
    }
    if(loading === true){
      getCommande();
      
    }
  }, [user,loading,userCommande]);

  return (
    <>
    <div className="profil">
    </div>
    <Button type="button"
          classes="btn btn__color-black"
          function={logout}
          title="Logout" />
    <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>dateEmission</th>
              <th>prix Total</th>
              <th>statut</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            { loading === false ? (
              userCommande?.map((commande)=>{
                return <tr key={commande[0].id}>
                  <td>{commande[0].id}</td>
                  <td>{formatDate(commande[0].dateEmission)}</td>
                  <td>{commande[0].prix}</td>
                  <td>{commande[0].statutCommande.libelle}</td>
                </tr>
              })
            ):(null)

            }
          </tbody>
        </table>
    </div>
    <h1>Bienvenue {user.user && user.user.pseudo} !</h1>
    </>
  );
}

export default withAuth(Index);