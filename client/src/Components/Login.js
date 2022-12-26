import React from "react";
import { Link } from "react-router-dom";

import './Login.css'

function Login() {
    return (
        <div className="loginBackdrop">
            <div className="loginContainer">
                <div className="loginHeaderContainer">
                    <p className="loginHeaderText">Login</p>
                </div>
                <div className="loginBodyContainer">
                    <div className="loginInputContainer">
                        <p className="loginUsernameText">Username</p>
                        <input className="loginInput" id="loginInput1"></input>
                    </div>
                    <div className="loginInputContainer">
                        <p className="loginPasswordText">Password</p>
                        <input type="password" className="loginInput" id="loginInput2"></input>
                    </div>
                    <div className="loginButtonsContainer">
                        <Link to="/home">
                            <button className="loginButton">Log In</button>
                        </Link>
                        <Link to="/home">
                            <button className="demoLoginButton">Demo Login</button>
                        </Link>
                    </div>
                </div>
                <div className="loginFooterContainer">
                    <p className="loginFooterText">Don't Have an Account?</p>
                    <Link className="loginFooterSignupLink" to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
