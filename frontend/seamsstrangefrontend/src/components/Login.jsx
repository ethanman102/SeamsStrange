import React, { useState } from "react";
import "../styles/Login.css";
import instance from "../api";
import { ThreeDot } from "react-loading-indicators";
import asModal from "./wrappers/asModal";
import { apiUrl } from "../constants";

const Login = ({authenticationStateHandler,appAuthHandler}) => {

    const [username,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [loading,setLoading] = useState(false);

    const ModalLoader = asModal(ThreeDot);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true);
        try{
        var response = await instance.post(`${apiUrl}/api/login/`,
            {
                email: username,
                password: password
            }
        );
        if (response.status === 200){
            authenticationStateHandler(true);
            appAuthHandler(true);
            setLoading(false);
        }
        }catch (error){
            if (error.response.status === 404){
                setErrorMessage("Incorrect Email or Password");
            }
            setLoading(false);
        }
    }

    return(
        (<div className="card">
            {loading && <ModalLoader size="medium" color="#ffffff" closeable={false}/>}
            <h1 className="loginHeader">Seams Strange Embroidery
                <div>Admin Login</div>
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className="textbox" onChange={(event) => setEmail(event.target.value)}/>
                <input type="password" name="password" placeholder="Password" className="textbox" onChange={(event) => setPassword(event.target.value)}/>
                <p className="loginErrorMessage">{errorMessage}</p>
                <button type="submit" className="submitButton">Login</button>
            </form>
        </div>)
    )
}
export default Login;