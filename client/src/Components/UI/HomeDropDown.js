import React from "react";

import './HomeDropDown.css'

function HomeDropDown() {
    return (
        <div className="homeDropDownContainer">
            <div className="optionContainer">
                <p className="optionText">Profile</p>
            </div>
            <div className="optionContainer">
                <p className="optionText">Settings</p>
            </div>
            <div className="optionContainer">
                <p className="optionText">Logout</p>
            </div>
        </div>
    )
}

export default HomeDropDown
