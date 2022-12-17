import React from "react";

import './TopCreatorContainer.css'

import personalPic from './Images/personal.jpg'

function TopCreatorContainer() {
    return (
        <div className="topCreatorContainer">
            <div className="topCreatorPositionContainer">
                <p className="topCreatorPositionText">#1 Creator</p>
            </div>
            <div className="topCreatorUserContainer">
                <img className="topCreatorPic" src={personalPic} alt=""/>
                <p className="topCreatorUserText">@cmacariovv</p>
            </div>
        </div>
    )
}

export default TopCreatorContainer
