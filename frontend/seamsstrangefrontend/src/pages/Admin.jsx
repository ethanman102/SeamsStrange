import React, { useState,useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../styles/ItemContainer.css"
import Login from "../components/Login";

const Admin = () =>{

    // Check to see if the user is logged in, if so then render the admin page else render the login.
    const [authenticated,setAuthenticated] = useState(null);

    useEffect(() =>{
        axios.get('http://localhost:8000/api/authenticated/', 
        // 
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
    {authenticated ? <h1>YOYO</h1> : <Login/>}
    </>
)

}

export default Admin;