import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import './Signup.css'

import ErrorAuthModal from "./UI/ErrorAuthModal";
import ImageUpload from "./UI/ImageUpload";
import LoadingSpinner from "./UI/LoadingSpinner";

function Signup() {
    let usernameInputRef = useRef()
    let fullNameInputRef = useRef()
    let emailInputRef = useRef()
    let passwordInputRef = useRef()

    let [showError, setShowError] = useState(false)
    let [errorsArr, setErrorsArr] = useState([])
    let [isValid, setIsValid] = useState(false)
    let [image, setImage] = useState(null)
    let [isSigningUp, setIsSigningUp] = useState(false)

    const auth = useContext(AuthContext)

    function closeError() {
        setShowError(false)
        setErrorsArr([])
    }

    async function signupUserHandler(event) {
        event.preventDefault()

        let signupInput1 = document.getElementById("signupInput1") // Username
        let signupInput2 = document.getElementById("signupInput2") // Email
        let signupInput3 = document.getElementById("signupInput3") // Password
        let signupInput4 = document.getElementById("signupInput4") // Full Name

        if (usernameInputRef.current.value === "" ||
            fullNameInputRef.current.value === "" ||
            emailInputRef.current.value === "" ||
            passwordInputRef.current.value === "") {
                setErrorsArr(["Fields cannot be empty."])
                setShowError(true)
        }

        // have modal that displays all corresponding messages

        async function validateInputs() {
            if (!signupInput1.checkValidity()) {
                setErrorsArr(prevListOfErrors => {
                    prevListOfErrors.push("Username must be all lowercase & at least 3 characters long.")
                    return [...prevListOfErrors]
                })
            }

            if (!signupInput4.checkValidity()) {
                setErrorsArr(prevListOfErrors => {
                    prevListOfErrors.push("Please enter your full name.")
                    return [...prevListOfErrors]
                })
            }

            if (!signupInput2.checkValidity()) {
                setErrorsArr(prevListOfErrors => {
                    prevListOfErrors.push("Please enter a valid email.")
                    return [...prevListOfErrors]
                })
            }
            if (!signupInput3.checkValidity()) {
                setErrorsArr(prevListOfErrors => {
                    prevListOfErrors.push("Password must be at least 8 characters, with at least 1 letter and 1 number.")
                    return [...prevListOfErrors]
                })
            }
            if (!isValid) {
                setErrorsArr(prevListOfErrors => {
                    prevListOfErrors.push("Please choose a profile picture.")
                    return [...prevListOfErrors]
                })
            }
        }

        async function callValidateInputs() {
            await validateInputs()
            if (errorsArr.length) {
                setShowError(true)
                return false
            }

            return true
        }

        let validated = await callValidateInputs()

        if (validated) {
            const formData = new FormData()
            formData.append('username', usernameInputRef.current.value)
            formData.append('fullName', fullNameInputRef.current.value)
            formData.append('email', emailInputRef.current.value)
            formData.append('password', passwordInputRef.current.value)
            formData.append('image', image)

            setIsSigningUp(true)

            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (data.message) {
                setErrorsArr([data.message])
                setShowError(true)
            }
            else {
                auth.login(data.userId, data.token, data.username, data.following, data.verified, data.profilePicture)
            }
        }
    }

    async function demoLoginUserHandlerSignup(event) {
        event.preventDefault()
        setIsSigningUp(true)

        const response = await fetch('http://localhost:5000/auth/login', {  // a null return in a authController ends fetch early
            method: 'POST',                                    // options request doesnt make it to POST when credentials are wrong
            body: JSON.stringify({
                'username': 'demo',
                'password': 'demologin1'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        auth.login(data.userId, data.token, data.username, data.following, data.verified, data.profilePicture)
    }

    function getImageData(isValid, image) {
        setIsValid(isValid)
        setImage(image)
    }


    return (
        <div className="signupBackdrop">
            {showError && <ErrorAuthModal errors={errorsArr} onCloseError={closeError}/>}
            <div className="signupContainer">
                <div className="signupHeaderContainer">
                    <p className="signupHeaderText">Sign Up</p>
                </div>
                {isSigningUp ? <LoadingSpinner /> : <div className="signupBodyContainer">
                    <div className="signupInputContainer">
                        <p className="signupUsernameText">Username</p>
                        <input className="signupInput" maxLength="32" placeholder="johndoe" id="signupInput1" pattern="[a-z]{3,}" ref={usernameInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupUsernameText">Full Name</p>
                        <input className="signupInput" maxLength="32" placeholder="John Doe" id="signupInput4" pattern="^(\w\w+)\s(\w+)$" ref={fullNameInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupPasswordText">Email</p>
                        <input type="email" placeholder="john@doe.com" className="signupInput" id="signupInput2" maxLength="40" pattern=".+@.+\.com" ref={emailInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                        <p className="signupPasswordText">Password</p>
                        <input type="password" maxLength="32" className="signupInput" id="signupInput3" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$" ref={passwordInputRef}></input>
                    </div>
                    <div className="signupInputContainer">
                    <p className="signupPasswordText">Profile Picture</p>
                        <ImageUpload onValid={getImageData}/>
                    </div>
                    <div className="signupButtonsContainer">
                        <Link to="/home">
                            <button className="signupButton" onClick={signupUserHandler}>Sign Up</button>
                        </Link>
                        <Link to="/home">
                            <button className="demosignupButton" onClick={demoLoginUserHandlerSignup}>Demo Login</button>
                        </Link>
                    </div>
                </div>}
                <div className="signupFooterContainer">
                    <p className="signupFooterText">Already Have an Account?</p>
                    <Link className="signupFooterLoginLink" to="/auth/login">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
