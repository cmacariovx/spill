import React from "react";

import './HomeDropDown.css'

function HomeDropDown() {
    return (
        <div className="homeDropDownContainer">
            <div className="optionContainer" id='profileText'>
                <p className="optionText">Profile</p>
            </div>
            <div className="optionContainer" id='settingsText'>
                <p className="optionText">Settings</p>
            </div>
            <div className="optionContainer" id='logoutText'>
                <p className="optionText">Logout</p>
            </div>
        </div>
    )
}

export default HomeDropDown
