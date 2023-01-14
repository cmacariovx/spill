import React, { useRef } from "react";
import { Link } from "react-router-dom";

import './Signup.css'

function Signup() {
    let usernameInputRef = useRef()
    let emailInputRef = useRef()
    let passwordInputRef = useRef()

    async function signupUserHandler(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            body: JSON.stringify({
                'username': usernameInputRef.current.value,
                'email': emailInputRef.current.value,
                'password': passwordInputRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()
        console.log(data)
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
                            <button className="demosignupButton">Demo Login</button>
                        </Link>
                    </div>
                </div>
                <div className="signupFooterContainer">
                    <p className="signupFooterText">Already Have an Account?</p>
                    <Link className="signupFooterLoginLink" to="/login">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
