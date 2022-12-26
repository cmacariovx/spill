import React from "react";
import { Link } from "react-router-dom";

import './HomeDropDown.css'

function HomeDropDown() {
    return (
        <div className="homeDropDownContainer">
            <Link to="/profile/cm" className="optionContainer" id='profileText'>
                <p className="optionText">Profile</p>
            </Link>
            <Link className="optionContainer" id='settingsText'>
                <p className="optionText">Settings</p>
            </Link>
            <Link to="/" className="optionContainer" id='logoutText'>
                <p className="optionText">Logout</p>
            </Link>
        </div>
    )
}

export default HomeDropDown
