import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import './HomeDropDown.css'

function HomeDropDown(props) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    async function logoutHandler(event) {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    function clickSend() {
        props.onCaptureSettingsClick()
    }

    function toProfileHandler() {
        navigate("/profile/" + auth.username)
    }

    return (
        <div className="homeDropDownContainer">
            <div onClick={toProfileHandler} className="optionContainer" id='profileText'>
                <p className="optionText">Profile</p>
            </div>
            <div className="optionContainer" onClick={clickSend} id='settingsText'>
                <p className="optionText">Settings</p>
            </div>
            <div className="optionContainer" id='logoutText' onClick={logoutHandler}>
                <p className="optionText">Logout</p>
            </div>
        </div>
    )
}

export default HomeDropDown
