import React, { useState,useEffect } from "react";
import axios from "axios";
import "../styles/ItemContainer.css"
import Login from "../components/Login";
import AdminTagPanel from "./AdminTagPanel";
import AdminNavBar from "../components/AdminNavbar";
import { Route, Routes } from "react-router-dom";
import "../styles/Admin.css"
import AdminItemPanel from "./AdminItemPanel";

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

    
    {authenticated ? 
    <>
    <div className="adminPageFlexContainer">
        <AdminNavBar/>
        <Routes>
            <Route path="items/" element={<AdminItemPanel/>}/>
            <Route path="tags/" element={<AdminTagPanel/>}/>
        </Routes>
    </div>
    </> : <Login/>}
    </>
)

}

export default Admin;