import React, { useState } from "react";

import './HomePostCard.css'

import personal from './Images/personal.jpg'

function HomePostCard(props) {
    function sendCardData() {
        props.onDetailedCardDataHandler(props.homePostCardData)
    }

    return (
        <div className="homePostCardContainer" onClick={() => {props.onShowCard(); sendCardData();}}>
            <div className="postCardUserContainer">
                <p className="postCardUsername">{props.homePostCardData.username}</p>
                <img className="postCardUserPic" src={personal} alt=""/>
            </div>
            <div className="postCardBodyContainer">
                <p className="postMainText">{props.homePostCardData.mainBodyText}</p>
            </div>
            <div className="postCardInteractContainer">
                <i className="fa-regular fa-thumbs-up"></i>
                <p className="likeCount">{props.homePostCardData.likeCount}</p>
            </div>
        </div>
    )
}

export default HomePostCard
