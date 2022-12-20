import React, { useState } from "react";

import HomePostCard from './HomePostCard'
import TopCreatorContainer from "./TopCreatorContainer";
import HomeDetailedPostCard from "./HomeDetailedPostCard";

import './HomeMainBody.css'

import personal from './Images/personal.jpg'

function HomeMainBody() {
    let [cardClick, setCardClick] = useState(false)

    function detailedCard() {
        setCardClick(true)
    }

    return (
        <div className="homeMainBodyContainer">
            <div className="homeMainBodyLeft">
                <div className="homeTextContainer">
                    <p className="homeText">Home</p>
                </div>
                <div className="statusUpdateContainer">
                    <div className="statusUpdateInputContainer">
                        <textarea className="statusUpdateInput" rows='4' cols='40' placeholder="How's your day been?"></textarea>
                    </div>
                    <button className="postStatusButton">Post</button>
                </div>

                <div className="homeFeedContainer">
                    {cardClick && <HomeDetailedPostCard />}
                    <HomePostCard onShowCard={detailedCard}/>
                    <HomePostCard />
                    <HomePostCard />
                </div>

                <div className="paginationContainer">

                </div>
            </div>
            <div className="homeMainBodyRight">
                <div className="profileContainer">
                    <p className="profileUsername">@cmacariovv</p>
                    <img src={personal} className="profileImg" alt=""/>
                </div>
                <div className="searchContainer">
                    <input className="searchInput" placeholder="Find a User"></input>
                </div>
                <div className="topCreatorsContainer">
                    <div className="topCreatorsTitleContainer">
                        <p className="topCreatorsTitleText">Top Creators</p>
                    </div>
                    <div className="topCreatorsListContainer">
                        <TopCreatorContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeMainBody
