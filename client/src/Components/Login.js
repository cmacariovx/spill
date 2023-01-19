import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

import './Login.css'

function Login() {
    let usernameInputRef2 = useRef()
    let passwordInputRef2 = useRef()

    const auth = useContext(AuthContext)

    async function loginUserHandler(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/auth/login', {  // a null return in a authController ends fetch early
            method: 'POST',                                      // options request doesnt make it to POST when credentials are wrong
            body: JSON.stringify({
                'username': usernameInputRef2.current.value,
                'password': passwordInputRef2.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()

        auth.login(data.userId, data.token)
    }
    async function demoLoginUserHandler(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/auth/login', {  // a null return in a authController ends fetch early
            method: 'POST',                                      // options request doesnt make it to POST when credentials are wrong
            body: JSON.stringify({
                'username': 'demo',
                'password': 'demologin'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()

        auth.login(data.userId, data.token)
    }
    return (
        <div className="loginBackdrop">
            <div className="loginContainer">
                <div className="loginHeaderContainer">
                    <p className="loginHeaderText">Login</p>
                </div>
                <div className="loginBodyContainer">
                    <div className="loginInputContainer">
                        <p className="loginUsernameText">Username</p>
                        <input className="loginInput" id="loginInput1" ref={usernameInputRef2}></input>
                    </div>
                    <div className="loginInputContainer">
                        <p className="loginPasswordText">Password</p>
                        <input type="password" className="loginInput" id="loginInput2" ref={passwordInputRef2}></input>
                    </div>
                    <div className="loginButtonsContainer">
                        <Link to="/home">
                            <button className="loginButton" onClick={loginUserHandler}>Log In</button>
                        </Link>
                        <Link to="/home">
                            <button className="demoLoginButton" onClick={demoLoginUserHandler}>Demo Login</button>
                        </Link>
                    </div>
                </div>
                <div className="loginFooterContainer">
                    <p className="loginFooterText">Don't Have an Account?</p>
                    <Link className="loginFooterSignupLink" to="/auth/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
