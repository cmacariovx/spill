import React, { useState } from "react";

import './HomeDetailedPostCard.css'

import profilePicDetailed from './Images/personal.jpg'

import HomeCommentCard from "./HomeCommentCard";

function HomeDetailedPostCard(props) {
    let [detailedCardData, setDetailedCardData] = useState(props.detailedCardData)

    return (
        <div className="backdrop" onClick={props.onCloseCard}>
            <div className="homeDetailedPostCard">
                <div className="homeDetailedLeftBody">
                    <div className="homeDetailedProfileContainer">
                        <img src={profilePicDetailed} className="homeDetailedProfilePic" alt=""></img>
                        <p className="homeDetailedProfileUsername">{detailedCardData.username}</p>
                    </div>
                    <div className="homeDetailedPostContainer">
                        <p className="homeDetailedPostText">{detailedCardData.mainBodyText}</p>
                    </div>
                    <div className="homeDetailedInteractContainer">
                        <i className="fa-regular fa-thumbs-up fa-222"></i>
                        <p className="homeLikeCount">{detailedCardData.likeCount}</p>
                    </div>
                </div>
                <div className="homeDetailedRightBody">
                    <div className="homeDetailedCloseButtonContainer">
                        <p className="homeDetailedCommentsTitle">Comments</p>
                        <i className="fa-solid fa-xmark" onClick={props.onCloseCard}></i>
                    </div>
                    <div className="homeDetailedCommentsFeedContainer">
                        <HomeCommentCard />
                        <HomeCommentCard />
                        <HomeCommentCard />
                        <HomeCommentCard />
                    </div>
                    <div className="homeDetailedCommentsInputContainer">
                        <input className="homeDetailedCommentsInput" placeholder="Add a Comment"></input>
                        <i className="fa-regular fa-paper-plane homeDetailedPostCommentButton"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDetailedPostCard
