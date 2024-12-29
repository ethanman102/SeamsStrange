import React, { useState,useEffect } from "react";
import axios from "axios";
import "../styles/ItemContainer.css"
import Login from "../components/Login";
import AdminTagPanel from "./AdminTagPanel";

const Admin = () =>{

    // Check to see if the user is logged in, if so then render the admin page else render the login.
    const [authenticated,setAuthenticated] = useState(null);

    useEffect(() =>{
        axios.get('http://localhost:8000/api/authenticated/', 
        {
            withCredentials: true
        }).then((response) =>{
            if (response.status === 200) setAuthenticated(true);
            else setAuthenticated(false);
        }).catch(()=> {setAuthenticated(false);}
    );

    },
[]);


return(
    <>
    {authenticated ? <AdminTagPanel/> : <Login/>}
    </>
)

}

export default Admin;