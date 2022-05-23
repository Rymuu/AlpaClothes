
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
  const { id } = router.query;


  useEffect(() => {
    const getCommande = () => {
      let jwt = localStorage.getItem("jwt");
      const result = axios.get(`http://localhost:8000/commande/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((res) => {
        setCommande(res.data.data[0])
        setloading(false)
      })
    }
    if (loading === true) {
      getCommande();
    }
    console.log(commande);
  }, [user, loading]);

  return (
    <>
      <center>
        <div className="profil">
          <h1>Order Summary :</h1>
          {loading === false ? (
            commande.ligneCommande?.map((ligne) => {
              console.log(ligne);
              return <tr key={ligne?.id}>
                <div className="list">
                  <div className="list__container">
                    <div className="list__data">
                      <h2 className="list__title">{ligne?.produit.nom}</h2>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Color</h2>
                      <p className="list__value">{ligne?.produit.couleur}</p>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Size</h2>
                      <p className="list__value">{ligne?.taille.libelle}</p>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Price</h2>
                      <p className="list__value">{ligne?.produit.prix} €</p>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Quantity</h2>
                      <p className="list__value">{ligne?.qte}</p>
                    </div>
                  </div>
                </div>
              </tr>
            })
          ) : (null)

          }
          <br/>
          <h1>Total : {commande.prix} €</h1>
        </div>

      </center>
    </>
  );
}

export default withAuth(Index);