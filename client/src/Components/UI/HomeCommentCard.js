import React from "react";

import './HomeCommentCard.css'

import userProfilePic from './Images/personal.jpg'

function HomeCommentCard() {
    return (
        <div className="homeCommentCardContainer">
            <div className="homeCommentProfileContainer">
                <img className="homeCommentProfilePic" src={userProfilePic} alt=""></img>
                <p className="homeCommentUsername">@cmacariovv</p>
            </div>
            <div className="homeCommentBodyContainer">
                <p className="homeCommentBodyText">What a game that was!</p>
            </div>
        </div>
    )
}

export default HomeCommentCard
