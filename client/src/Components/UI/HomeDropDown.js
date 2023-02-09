import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import './HomeDropDown.css'

function HomeDropDown(props) {
    const auth = useContext(AuthContext)

    async function logoutHandler(event) {
        event.preventDefault()
        auth.logout()
    }

    function clickSend() {
        props.onCaptureSettingsClick()
    }

    return (
        <div className="homeDropDownContainer">
            <Link to={"/profile/" + auth.username} className="optionContainer" id='profileText'>
                <p className="optionText">Profile</p>
            </Link>
            <div className="optionContainer" onClick={clickSend} id='settingsText'>
                <p className="optionText">Settings</p>
            </div>
            <Link to="/" className="optionContainer" id='logoutText' onClick={logoutHandler}>
                <p className="optionText">Logout</p>
            </Link>
        </div>
    )
}

export default HomeDropDown
