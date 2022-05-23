
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext,useState,useEffect } from 'react';
import UserContext from '../User/UserContext';
const List = (props) => {
    const router = useRouter();
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const randomTaille = Math.floor(Math.random() * 4)

    const removeProduct = (product)=>{
        let jwt = localStorage.getItem("jwt");
        const result = axios.get(`http://localhost:8000/admin/remove/${product.id}`,{
            headers: {
                Authorization : `Bearer ${jwt}`
              }
        }).catch((error)=>{
            console.log(error);
        })
    }

    const activeUser = (user)=>{
        let jwt = localStorage.getItem("jwt");
        let formData = new FormData();
        formData.append("active",!isActive); 
        const result = axios.post(`http://localhost:8000/admin/active/${user.id}`,formData,{
            headers: {
                Authorization : `Bearer ${jwt}`
              }
        }).then(()=>{
            setIsActive(!isActive)
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(() => {
        if(router.asPath === "/admin/users" && loading === true){
            setIsActive(props.user.active)
            setLoading(false)
        }
    }, [loading,isActive]);
    return (
        <>
            {router.asPath === "/admin/products" ?
                (
                    <>
                        <div className="list">
                            <div className="list__container">
                                <img className="list__img" src={props.product.image} alt={props.product.nom} />

                                <div className="list__data">
                                    <h2 className="list__title">{props.product.nom}</h2>
                                    <p className="list__price">{props.product.prix} € </p>
                                </div>
                                <div className="list__data">
                                    <h2 className="list__title">Color</h2>
                                    <p className="list__price">{props.product.couleur}</p>
                                </div>
                                <div className="list__data">
                                    <h2 className="list__title">Size</h2>
                                    
                                    <p className="list__price">{props.product.stockTailles[randomTaille]?.taille.libelle}</p>
                                </div>
                                <div className="list__data">
                                    <h2 className="list__title">Availability</h2>
                                    <p className="list__price">{props.product.stockTailles[randomTaille]?.qte === 0?(<>sold out</>):(<>In stock</>)
                                    }</p>
                                </div>
                                <div className="list__button">
                                    <button className="btn btn__color-black" onClick={() => router.push(`/admin/products/update/${props.product.id}`)}>Modify</button>
                                    <button className="btn btn__color-black" onClick={() => removeProduct(props.product)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <div className="list">
                        <div className="list__container">
                            <div className="list__data">
                                <h2 className="list__title">{props.user.pseudo}</h2>
                            </div>
                            <div className="list__data">
                                <h2 className="list__title">Lastname</h2>
                                <p className="list__value">{props.user.nom}</p>
                            </div>
                            <div className="list__data">
                                <h2 className="list__title">Firstname</h2>
                                <p className="list__value">{props.user.prenom}</p>
                            </div>
                            <div className="list__data">
                                <h2 className="list__title">Email</h2>
                                <p className="list__value">{props.user.email}</p>
                            </div>
                            <div className="list__button">
                                <button className="btn btn__color-black" onClick={()=>{activeUser(props.user)}}>{isActive === true?(<>Deactivate</>):(<>activate</>)}</button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}

export default List;