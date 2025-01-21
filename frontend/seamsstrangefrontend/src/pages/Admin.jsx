import React, { useState,useEffect, createContext } from "react";
import "../styles/ItemContainer.css"
import Login from "../components/Login";
import AdminTagPanel from "./AdminTagPanel";
import AdminNavBar from "../components/AdminNavbar";
import { Route, Routes } from "react-router-dom";
import "../styles/Admin.css"
import AdminItemPanel from "./AdminItemPanel";
import instance from "../api";
import { ThreeDot } from "react-loading-indicators";
import asModal from "../components/wrappers/asModal";
import AdminSocialPanel from "./AdminSocialPanel";
import NotFound from "./NotFound";

export const AuthContext = createContext();

const Admin = ({appAuthHandler}) =>{

    // Check to see if the user is logged in, if so then render the admin page else render the login.
    const [authenticated,setAuthenticated] = useState(null);

    const ModalLoader = asModal(ThreeDot);

    useEffect(() =>{
        instance.get('http://localhost:8000/api/authenticated/').then((response) =>{
            if (response.status === 200){ setAuthenticated(true);
                appAuthHandler(true);
            }
            else{ setAuthenticated(false);
                appAuthHandler(false);
            }
        }).catch((error)=> {setAuthenticated(false);
            appAuthHandler(false);
        }
    );

    },
[]);

const handleAuthenticationState = (authBool) => setAuthenticated(authBool)


return(
    <> 
    {authenticated === null ? <ModalLoader color="#ffffff" size="medium" closeable={false}/> : 
    
      authenticated ? (<div className="adminPageFlexContainer">
        <AdminNavBar appAuthHandler={appAuthHandler}/>
        <AuthContext.Provider value={handleAuthenticationState}>
            <Routes>
                    <Route path="/"/>
                    <Route path="items/" element={<AdminItemPanel />}/>
                    <Route path="tags/" element={<AdminTagPanel />}/>
                    <Route path="socials/" element={<AdminSocialPanel/>}/>
                    <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AuthContext.Provider>
    </div>)
     : (<Login authenticationStateHandler={handleAuthenticationState} appAuthHandler={appAuthHandler}/>)}
    </>
)

}

export default Admin;