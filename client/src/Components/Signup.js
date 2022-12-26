import React from "react";
import { Link } from "react-router-dom";

import './Signup.css'

function Signup() {
    return (
        <div className="signupBackdrop">
            <div className="signupContainer">
                <div className="signupHeaderContainer">
                    <p className="signupHeaderText">Sign Up</p>
                </div>
                <div className="signupBodyContainer">
                    <div className="signupInputContainer">
                        <p className="signupUsernameText">Username</p>
                        <input className="signupInput" id="signupInput1"></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupPasswordText">Email</p>
                        <input type="email" className="signupInput" id="signupInput2" maxLength="40" pattern=".+@.+\.com"></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupPasswordText">Password</p>
                        <input type="password" className="signupInput" id="signupInput3"></input>
                    </div>
                    <div className="signupButtonsContainer">
                        <Link to="/home">
                            <button className="signupButton">Sign Up</button>
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
