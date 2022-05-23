import React, { createContext,useReducer } from 'react';

const intialValue = {user: null};
const User = createContext(intialValue)
const {Provider} = User;

const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(( state , action)=>{
        switch (action.type){
            case "login":
                let {
                    email: emailLogin,
                    nom: nomLogin,
                    prenom : prenomLogin,
                    roles: rolesLogin,
                } = action.payload;
                if(nomLogin === null){
                    nomLogin = "Nom";
                }
                if(prenomLogin === null) {
                    prenomLogin = "Prenom"
                }
                let newStateLogin = {
                    user: {
                        email: emailLogin,
                        nom: nomLogin,
                        prenom: prenomLogin,
                        roles: rolesLogin,
                    },
                };
                console.log(intialValue);
                localStorage.setItem("jwt",jwtLogin);
                localStorage("roles",rolesLogin);
                return newStateLogin;
            case "logout":
                localStorage.removeItem("jwt");
                localStorage.removeItem("roles");
                return intialValue;
        }
    },intialValue);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { User, StateProvider };
