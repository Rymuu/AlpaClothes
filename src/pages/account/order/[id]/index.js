
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import withAuth from "../../../../HOC/withAuth";
import Button from "../../../../components/Button";
import { useRouter } from 'next/router';
import UserContext from "../../../../User/UserContext"

const Index = () => {
  const [loading, setloading] = useState(true);
  const [commande, setCommande] = useState([]);
  const router = useRouter();
  const user = useContext(UserContext);
  const {id } = router.query;


  useEffect(() => {
    const getCommande = () =>{
      let jwt = localStorage.getItem("jwt");
      const result = axios.get(`http://localhost:8000/commande/${id}`,{
        headers: {
          Authorization : `Bearer ${jwt}`
        }
      }).then((res)=>{
        setCommande(res.data.data[0])
        setloading(false)
      })
    }
    if(loading === true){
      getCommande();
    }
    console.log(commande);
  }, [user,loading]);

  return (
    <>
    <div className="profil">
        <table>
          <thead>
            <tr>
              <th>produit</th>
              <th>couleur</th>
              <th>taille</th>
              <th>prix</th>
              <th>qte</th>
            </tr>
          </thead>
          <tbody>
          { loading === false ? (
              commande.ligneCommande?.map((ligne)=>{
                  console.log(ligne);
                return <tr key={ligne?.id}>
                  <td>{ligne?.produit.nom}</td>
                  <td>{ligne?.produit.couleur}</td>
                  <td>{ligne?.taille.libelle}</td>
                  <td>{ligne?.produit.prix}</td>
                  <td>{ligne?.qte}</td>
                </tr>
              })
            ):(null)

            }
          </tbody>
          <div>total : {commande.prix}</div>
        </table>
    </div>
    <h1>Bienvenue {user.user && user.user.pseudo} !</h1>
    </>
  );
}

export default withAuth(Index);