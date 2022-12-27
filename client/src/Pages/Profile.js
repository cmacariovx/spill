import React, { useState } from "react";

import './Profile.css'

import mainProfileBodyPic from '../Components/UI/Images/personal.jpg'

import HomePostCard from "../Components/UI/HomePostCard"
import HomeDetailedPostCard from "../Components/UI/HomeDetailedPostCard"

function Profile() {
    let [cardClick2, setCardClick2] = useState(false)
    let [detailedCardData2, setDetailedCardData2] = useState({})

    function detailedCard2() {
        setCardClick2(true)
    }

    function closeCard2() {
        setCardClick2(false)
    }

    let mainPostFeedPosts2 = [
        {
            'username': '@cmacariovx',
            'mainBodyText': 'Warzone 2 is looking a bit more polished now!',
            'likeCount': 543,
        },
        {
            'username': '@cmacariovx',
            'mainBodyText': 'Testing',
            'likeCount': 2,
        },
        {
            'username': '@cmacariovx',
            'mainBodyText': 'Does Socia have star potential?',
            'likeCount': 991,
        }
    ]

    let [listOfPosts2, setListOfPosts2] = useState(mainPostFeedPosts2)

    function detailedCardDataHandler2(detailedPostData2) {
        setDetailedCardData2(detailedPostData2)
    }

    return (
        <div className="profilePageContainer">
            <div className="mainProfileBodyContainer">
                <div className="mainProfileBodyIntroContainer">
                    <img className="mainProfileIntroPic" src={mainProfileBodyPic} alt=""></img>
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
                            <p className="mainProfileStatNumber">284</p>
                        </div>
                    </div>
                </div>
                <div className="mainProfileBodyFollowContainer">
                    <button className="followButton">Follow</button>
                    <button className="editButton">Edit Profile</button>
                </div>
                <div className="mainProfilePostsFeedContainer">
                    {cardClick2 && <HomeDetailedPostCard onCloseCard={closeCard2} detailedCardData={detailedCardData2}/>}
                    {listOfPosts2.map((post, index) => <HomePostCard onShowCard={detailedCard2} homePostCardData={post} onDetailedCardDataHandler={detailedCardDataHandler2} key={index}/>)}
                </div>
            </div>
        </div>
    )
}

export default Profile
