import axios from "axios";
import { createContext,useState,useEffect } from "react";
import { useRouter } from 'next/router';


const UserContext = createContext({
    user: null,
    jwt:null,
    login: (jwtLogin) => {},
    logout: () => {},
    authReady: false
});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [jwtLogin , setJwtLogin] = useState("")
    const router = useRouter();
    useEffect(() => {
        
    }, [user]);

    const login = (jwtUser) => {
        axios
        .get('http://localhost:8000/client/me',{
          headers : {
            Authorization : `Bearer ${jwtUser}`
          }
        })
        .then(response => {
          setUser(response.data.data[0])
          setJwtLogin(jwtUser);
          router.push("/account")
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
    }
    const context = {user: user, login: login ,jwt: jwtLogin};
    return (
        <UserContext.Provider value={context}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContext;