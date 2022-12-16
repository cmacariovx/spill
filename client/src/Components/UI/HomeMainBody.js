import React from "react";

import './HomeMainBody.css'

import personal from './Images/personal.jpg'

function HomeMainBody() {
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

                </div>
                <div className="paginationContainer">

                </div>
            </div>
            <div className="homeMainBodyRight">
                <div className="profileContainer">
                    <p className="profileUsername">@cmacariovv</p>
                    <img src={personal} className="profileImg" />
                </div>
                <div className="recommendedPostsContainer">

                </div>
                <div className="recommendedCreatorsContainer">

                </div>
            </div>
        </div>
    )
}

export default HomeMainBody
