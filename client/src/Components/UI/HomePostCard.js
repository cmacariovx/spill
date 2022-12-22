import React, { useEffect, useState } from "react";

import './HomePostCard.css'

import personal from './Images/personal.jpg'

function HomePostCard(props) {
    let homePostCardDataObj = {
        'postCardUsername': '@cmacariovx',
        'postCardMainText': "Who's ready for Argentina vs. France?",
        'postCardLikeCount': 875
    }

    let [homePostCardData, setHomePostCardData] = useState(homePostCardDataObj)

    function sendCardData() {
        props.onDetailedCardDataHandler(homePostCardData)
    }

    return (
        <div className="homePostCardContainer" onClick={() => {props.onShowCard(); sendCardData();}}>
            <div className="postCardUserContainer">
                <p className="postCardUsername">{homePostCardData.postCardUsername}</p>
                <img className="postCardUserPic" src={personal} alt=""/>
            </div>
            <div className="postCardBodyContainer">
                <p className="postMainText">{homePostCardData.postCardMainText}</p>
            </div>
            <div className="postCardInteractContainer">
                <i className="fa-regular fa-thumbs-up"></i>
                <p className="likeCount">{homePostCardData.postCardLikeCount}</p>
            </div>
        </div>
    )
}

export default HomePostCard
