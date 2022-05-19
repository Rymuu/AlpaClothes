import axios from "axios";
import { createContext,useState,useEffect } from "react";

const UserContext = createContext({
    user: null,
    login: (jwtLogin) => {},
    logout: () => {},
    authReady: false
});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState();
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
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
    }
    const context = {user: user, login: login};
    return (
        <UserContext.Provider value={context}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContext;