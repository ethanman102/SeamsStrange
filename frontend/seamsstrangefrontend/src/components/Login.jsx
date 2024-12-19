import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {

    const [submittedContent,setSubmittedContent] = useState(null);

    const handleSubmit = (event) =>{
        event.preventDefault();

    }

    return(
        (<div className="card">
            <h1>Seams Strange Embroidary
                <h6>Admin Login</h6>
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className="textbox"/>
                <input type="password" name="password" placeholder="Password" className="textbox"/>
                <input type="submit" className="submitButton"/>
            </form>
        </div>)
    )
}
export default Login