import React from "react";

import './HomeDetailedPostCard.css'

import profilePicDetailed from './Images/personal.jpg'

function HomeDetailedPostCard() {
    return (
        <div className="homeDetailedPostCard">
            <div className="homeDetailedLeftBody">
                <div className="homeDetailedProfileContainer">
                    <img src={profilePicDetailed} className="homeDetailedProfilePic"></img>
                    <p className="homeDetailedProfileUsername">@cmacariovv</p>
                </div>
                <div className="homeDetailedPostContainer">
                    <p className="homeDetailedPostText">Hellooo</p>
                </div>
                <div className="homeDetailedInteractContainer">
                    <i className="fa-regular fa-thumbs-up fa-222"></i>
                    <p className="homeLikeCount">577</p>
                </div>
            </div>
            <div className="homeDetailedRightBody">
                <div className="homeDetailedCloseButtonContainer">

                </div>
                <div className="homeDetailedRightTitleContainer">

                </div>
                <div className="homeDetailedCommentsFeedContainer">

                </div>
                <div className="homeDetailedCommentInputContainer"></div>
            </div>
        </div>
    )
}

export default HomeDetailedPostCard
