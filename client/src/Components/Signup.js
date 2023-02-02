import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import './Signup.css'

function Signup() {
    let usernameInputRef = useRef()
    let fullNameInputRef = useRef()
    let emailInputRef = useRef()
    let passwordInputRef = useRef()

    const auth = useContext(AuthContext)

    async function signupUserHandler(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                'username': usernameInputRef.current.value,
                'fullName': fullNameInputRef.current.value,
                'email': emailInputRef.current.value,
                'password': passwordInputRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
        auth.login(data.userId, data.token, data.username, data.following)
    }

    async function demoLoginUserHandlerSignup(event) {
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

        auth.login(data.userId, data.token, data.username, data.following)
    }

    return (
        <div className="signupBackdrop">
            <div className="signupContainer">
                <div className="signupHeaderContainer">
                    <p className="signupHeaderText">Sign Up</p>
                </div>
                <div className="signupBodyContainer">
                    <div className="signupInputContainer">
                        <p className="signupUsernameText">Username</p>
                        <input className="signupInput" id="signupInput1" ref={usernameInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupUsernameText">Full Name</p>
                        <input className="signupInput" id="signupInput4" ref={fullNameInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupPasswordText">Email</p>
                        <input type="email" className="signupInput" id="signupInput2" maxLength="40" pattern=".+@.+\.com" ref={emailInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupPasswordText">Password</p>
                        <input type="password" className="signupInput" id="signupInput3" ref={passwordInputRef}></input>
                    </div>
                    <div className="signupButtonsContainer">
                        <Link to="/home">
                            <button className="signupButton" onClick={signupUserHandler}>Sign Up</button>
                        </Link>
                        <Link to="/home">
                            <button className="demosignupButton" onClick={demoLoginUserHandlerSignup}>Demo Login</button>
                        </Link>
                    </div>
                </div>
                <div className="signupFooterContainer">
                    <p className="signupFooterText">Already Have an Account?</p>
                    <Link className="signupFooterLoginLink" to="/auth/login">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
