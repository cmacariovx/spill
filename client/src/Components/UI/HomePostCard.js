import React from "react";

import './HomePostCard.css'

import personal from './Images/personal.jpg'

function HomePostCard() {
    return (
        <div className="homePostCardContainer">
            <div className="postCardUserContainer">
                <p className="postCardUsername">@cmacariovv</p>
                <img className="postCardUserPic" src={personal} />
            </div>
            <div className="postCardBodyContainer">
                <p className="postMainText">Who's ready for Argentina vs. France?</p>
            </div>
            <div className="postCardInteractContainer">
                <i class="fa-regular fa-thumbs-up"></i>
                <p className="likeCount">577</p>
            </div>
        </div>
    )
}

export default HomePostCard
