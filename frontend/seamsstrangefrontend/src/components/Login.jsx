import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import instance from "../api";

const Login = ({authenticationStateHandler}) => {

    const [username,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
        var response = await instance.post('http://localhost:8000/api/login/',
            {
                email: username,
                password: password
            }
        );
        if (response.status === 200){
            authenticationStateHandler(true);
        }
        }catch (error){

        }
    }

    return(
        (<div className="card">
            <h1 className="loginHeader">Seams Strange Embroidary
                <div>Admin Login</div>
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className="textbox" onChange={(event) => setEmail(event.target.value)}/>
                <input type="password" name="password" placeholder="Password" className="textbox" onChange={(event) => setPassword(event.target.value)}/>
                <button type="submit" className="submitButton">Login</button>
            </form>
        </div>)
    )
}
export default Login;