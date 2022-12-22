import React, { useState } from "react";

import './Profile.css'

import mainProfileBodyPic from '../Components/UI/Images/personal.jpg'

import HomePostCard from "../Components/UI/HomePostCard"
import HomeDetailedPostCard from "../Components/UI/HomeDetailedPostCard"

function Profile() {
    let [cardClick2, setCardClick2] = useState(false)

    function detailedCard2() {
        setCardClick2(true)
    }

    function closeCard2() {
        setCardClick2(false)
    }

    return (
        <div className="profilePageContainer">
            <div className="mainProfileBodyContainer">
                <div className="mainProfileBodyIntroContainer">
                    <img className="mainProfileIntroPic" src={mainProfileBodyPic}></img>
                    <div className="mainProfileIntroCredentialsContainer">
                        <p className="mainProfileNameText">Carlos Macario</p>
                        <p className="mainProfileUsernameText">@cmacariovx</p>
                    </div>
                    <div className="mainProfileIntroStatsContainer">
                        <div className="mainProfileFollowersContainer">
                            <p className="mainProfileStatTitle">Followers</p>
                            <p className="mainProfileStatNumber">180K</p>
                        </div>
                        <div className="mainProfileFollowingContainer">
                            <p className="mainProfileStatTitle">Following</p>
                            <p className="mainProfileStatNumber">7</p>
                        </div>
                        <div className="mainProfilePostsNumberContainer">
                            <p className="mainProfileStatTitle">Posts</p>
                            <p className="mainProfileStatNumber">283</p>
                        </div>
                    </div>
                </div>
                <div className="mainProfileBodyFollowContainer">
                    <button className="followButton">Follow</button>
                    <button className="editButton">Edit Profile</button>
                </div>
                <div className="mainProfilePostsFeedContainer">
                    {cardClick2 && <HomeDetailedPostCard onCloseCard={closeCard2}/>}
                    <HomePostCard onShowCard={detailedCard2}/>
                </div>
            </div>
        </div>
    )
}

export default Profile
