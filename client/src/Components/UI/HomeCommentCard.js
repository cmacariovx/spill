import React from "react";

import './HomeCommentCard.css'

import userProfilePic from './Images/personal.jpg'

function HomeCommentCard(props) {
    return (
        <div className="homeCommentCardContainer">
            <div className="homeCommentProfileContainer">
                <img className="homeCommentProfilePic" src={userProfilePic} alt=""></img>
                <p className="homeCommentUsername">{props.commentData.commentUsername}</p>
            </div>
            <div className="homeCommentBodyContainer">
                <p className="homeCommentBodyText">{props.commentData.commentBodyText}</p>
            </div>
        </div>
    )
}

export default HomeCommentCard
