import React from "react";

import './HomeDetailedPostCard.css'

import profilePicDetailed from './Images/personal.jpg'

import HomeCommentCard from "./HomeCommentCard";

function HomeDetailedPostCard() {
    return (
        <div className="homeDetailedPostCard">
            <div className="homeDetailedLeftBody">
                <div className="homeDetailedProfileContainer">
                    <img src={profilePicDetailed} className="homeDetailedProfilePic"></img>
                    <p className="homeDetailedProfileUsername">@cmacariovx</p>
                </div>
                <div className="homeDetailedPostContainer">
                    <p className="homeDetailedPostText">Who's ready for Argentina vs. France?</p>
                </div>
                <div className="homeDetailedInteractContainer">
                    <i className="fa-regular fa-thumbs-up fa-222"></i>
                    <p className="homeLikeCount">577</p>
                </div>
            </div>
            <div className="homeDetailedRightBody">
                <div className="homeDetailedCloseButtonContainer">
                    <p class="homeDetailedCommentsTitle">Comments</p>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div className="homeDetailedCommentsFeedContainer">
                    <HomeCommentCard />
                    <HomeCommentCard />
                    <HomeCommentCard />
                    <HomeCommentCard />
                </div>
                <div className="homeDetailedCommentsInputContainer">
                    <input className="homeDetailedCommentsInput" placeholder="Add a Comment"></input>
                    <i class="fa-regular fa-paper-plane homeDetailedPostCommentButton"></i>
                </div>
            </div>
        </div>
    )
}

export default HomeDetailedPostCard
