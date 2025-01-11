import React, { useState,useEffect, createContext } from "react";
import "../styles/ItemContainer.css"
import Login from "../components/Login";
import AdminTagPanel from "./AdminTagPanel";
import AdminNavBar from "../components/AdminNavbar";
import { Route, Routes } from "react-router-dom";
import "../styles/Admin.css"
import AdminItemPanel from "./AdminItemPanel";
import instance from "../api";

export const AuthContext = createContext();

const Admin = () =>{

    // Check to see if the user is logged in, if so then render the admin page else render the login.
    const [authenticated,setAuthenticated] = useState(null);

    useEffect(() =>{
        instance.get('http://localhost:8000/api/authenticated/').then((response) =>{
            if (response.status === 200) setAuthenticated(true);
            else setAuthenticated(false);
        }).catch((error)=> {setAuthenticated(false);}
    );

    },
[]);

const handleAuthenticationState = (authBool) => setAuthenticated(authBool)


return(
    <> 
    {authenticated ? 
    <>
    <div className="adminPageFlexContainer">
        <AdminNavBar/>
        <AuthContext.Provider value={handleAuthenticationState}>
            <Routes>
                    <Route path="items/" element={<AdminItemPanel />}/>
                    <Route path="tags/" element={<AdminTagPanel />}/>
            </Routes>
        </AuthContext.Provider>
    </div>
    </> : <Login authenticationStateHandler={handleAuthenticationState}/>}
    </>
)

}

export default Admin;