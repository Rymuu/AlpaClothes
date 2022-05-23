import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";

const withAdminAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter();
        const [authVerified, setAuthVerified] = useState(false);
        
        useEffect(() => {
          const token = localStorage.getItem('admin');
          if (!token) {
              Router.push('/shop')
          }
          else {
              setAuthVerified(true)
          }

        }, [Router]);
        if (authVerified) {
            return <WrappedComponent {...props}/>;
        }
        else {
            return null;
        }
    }     
}



export default withAdminAuth;