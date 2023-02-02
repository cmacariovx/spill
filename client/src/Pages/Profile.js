import React, { useContext, useEffect, useState } from "react";

import './Profile.css'

import mainProfileBodyPic from '../Components/UI/Images/personal.jpg'

import HomePostCard from "../Components/UI/HomePostCard"
import HomeDetailedPostCard from "../Components/UI/HomeDetailedPostCard"
import { AuthContext } from "../context/auth-context";

function Profile(props) {
    let [cardClick2, setCardClick2] = useState(false)
    let [detailedCardData2, setDetailedCardData2] = useState({})
    let [userData, setUserData] = useState(null)
    let [dataFetched, setDataFetched] = useState(true)
    let [isFollowing, setIsFollowing] = useState(false)

    // let [profileUsername, setProfileUsername] = useState(props.usernameProfile)

    const auth = useContext(AuthContext)

    function detailedCard2() {
        setCardClick2(true)
    }

    function closeCard2() {
        setCardClick2(false)
    }

    let mainPostFeedPosts2 = [
        {
            'username': '@cmacariovx',
            'mainText': 'Warzone 2 is looking a bit more polished now!',
            'likeCount': 543,
        },
        {
            'username': '@cmacariovx',
            'mainText': 'Testing',
            'likeCount': 2,
        },
        {
            'username': '@cmacariovx',
            'mainText': 'Does Socia have star potential?',
            'likeCount': 991,
        }
    ]

    let [listOfPosts2, setListOfPosts2] = useState(mainPostFeedPosts2)

    function detailedCardDataHandler2(detailedPostData2) {
        setDetailedCardData2(detailedPostData2)
    }

    async function fetchUserProfile(profileUsername) {
        let response = await fetch("http://localhost:5000/profile/" + profileUsername, {
            method: "POST",
            body: JSON.stringify({profileUsername: profileUsername}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        let data = await response.json()
        setUserData(data)
        data.followers.forEach(follower => {
            if (follower.loggedInUsername === auth.username) setIsFollowing(true)
        })
        setDataFetched(true)
        console.log(data)
    }

    useEffect(() => {
        fetchUserProfile(window.location.pathname.slice(9))
    }, [])

    async function followHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/home/follow", {
            method: "POST",
            body: JSON.stringify({
                "loggedInUserId": auth.userId,
                "loggedInUsername": auth.username,
                "followedUserId": userData._id,
                "followedUsername": userData.username
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
    }

    async function unfollowHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/home/unfollow", {
            method: "POST",
            body: JSON.stringify({
                "loggedInUserId": auth.userId,
                "loggedInUsername": auth.username,
                "followedUserId": userData._id,
                "followedUsername": userData.username
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
    }

    return (
        <div className="profilePageContainer">
            <div className="mainProfileBodyContainer">
                <div className="mainProfileBodyIntroContainer">
                    <img className="mainProfileIntroPic" src={mainProfileBodyPic} alt=""></img>
                    <div className="mainProfileIntroCredentialsContainer">
                        <p className="mainProfileNameText">{dataFetched && userData && userData.fullName}</p>
                        <p className="mainProfileUsernameText">{dataFetched && userData && "@" + userData.username}</p>
                    </div>
                    <div className="mainProfileIntroStatsContainer">
                        <div className="mainProfileFollowersContainer">
                            <p className="mainProfileStatTitle">Followers</p>
                            <p className="mainProfileStatNumber">{dataFetched && userData && userData.followersNum}</p>
                        </div>
                        <div className="mainProfileFollowingContainer">
                            <p className="mainProfileStatTitle">Following</p>
                            <p className="mainProfileStatNumber">{dataFetched && userData && userData.followingNum}</p>
                        </div>
                        <div className="mainProfilePostsNumberContainer">
                            <p className="mainProfileStatTitle">Posts</p>
                            <p className="mainProfileStatNumber">{dataFetched && userData && userData.postsNum}</p>
                        </div>
                    </div>
                </div>
                <div className="mainProfileBodyFollowContainer">
                    {/* if data is fetched not && */}

                    {(dataFetched && !isFollowing)
                    ? <button className="followButton" onClick={followHandler}>Follow</button>
                    : <button className="unfollowButton" onClick={unfollowHandler}>Unfollow</button>}

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
