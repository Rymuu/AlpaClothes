
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import withAdminAuth from "../../../HOC/withAdminAuth";
import Button from "../../../components/Button";
import { useRouter } from 'next/router';
import UserContext from "../../../User/UserContext";

const Index = () => {
  const [loading, setloading] = useState(true);
  const [userCommande, setUserCommande] = useState([]);
  const router = useRouter();
  const user = useContext(UserContext);

  const formatDate = (date) => {
    let newDate = new Date(date)
    let day = newDate.getDay();
    let month = newDate.getMonth();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let formatedDate = newDate.getFullYear() + "-" + month + "-" + day;
    return formatedDate;
  }

  useEffect(() => {
    const getCommande = () => {
      let jwt = localStorage.getItem("jwt");
      const result = axios.get("http://localhost:8000/client/commande", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((res) => {
        setUserCommande(res.data.data)
        setloading(false)
      })
    }
    if (loading === true) {
      getCommande();

    }
  }, [user, loading, userCommande]);

  return (
    <>
      <div className="orders">
      </div>
      <center>
        <div className="orders">
          <h1>Orders :</h1>
          {loading === false ? (
            userCommande.map((commande) => {
              return <tr key={commande[0].id}>
                <div className="list">
                  <div className="list__container">
                    <div className="list__data">
                      <h2 className="list__title">{commande[0].id}</h2>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Date Emission</h2>
                      <p className="list__value">{formatDate(commande[0].dateEmission)}</p>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Total Price</h2>
                      <p className="list__value">{commande[0].prix}</p>
                    </div>
                    <div className="list__data">
                      <h2 className="list__title">Status</h2>
                      <p className="list__value">{commande[0].statutCommande.libelle}</p>
                    </div>
                    <div className="list__data">
                      <p><button className="btn btn__color-black" onClick={() => router.push(`/account/order/${commande[0].id}`)}>See more</button></p>
                    </div>
                  </div>
                </div>
              </tr>
            })
          ) : (null)

          }
        </div>

      </center>
    </>
  );
}

export default withAdminAuth(Index);