
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
    localStorage.removeItem('admin');
    router.push("/login")
  }

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
      <div className="profil">
      </div>
      <Button type="button"
        classes="btn btn__color-black"
        function={logout}
        title="Logout" />
      <h1>Welcome {user.user && user.user.pseudo} !</h1>
      <center>
        <div className="profil">
          <h1>My Orders :</h1>
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

export default withAuth(Index);