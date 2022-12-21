import React from "react";

import './HomePostCard.css'

import personal from './Images/personal.jpg'

function HomePostCard(props) {
    return (
        <div className="homePostCardContainer" onClick={props.onShowCard}>
            <div className="postCardUserContainer">
                <p className="postCardUsername">@cmacariovx</p>
                <img className="postCardUserPic" src={personal} alt=""/>
            </div>
            <div className="postCardBodyContainer">
                <p className="postMainText">Who's ready for Argentina vs. France?</p>
            </div>
            <div className="postCardInteractContainer">
                <i className="fa-regular fa-thumbs-up"></i>
                <p className="likeCount">576</p>
            </div>
        </div>
    )
}

export default HomePostCard
