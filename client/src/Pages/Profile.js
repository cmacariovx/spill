import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Profile.css'

import mainProfileBodyPic from '../Components/UI/Images/personal.jpg'

import HomePostCard from "../Components/UI/HomePostCard"
import HomeDetailedPostCard from "../Components/UI/HomeDetailedPostCard"
import { AuthContext } from "../context/auth-context";
import SettingsModal from "../Components/UI/SettingsModal";
import FollowersModal from "../Components/UI/FollowersModal";

function Profile(props) {
    let [cardClick2, setCardClick2] = useState(false)
    let [detailedCardData2, setDetailedCardData2] = useState({})
    let [userData, setUserData] = useState(null)
    let [dataFetched, setDataFetched] = useState(false)
    let [isFollowing, setIsFollowing] = useState(false)
    let [isSelfProfile, setIsSelfProfile] = useState(false)
    let [listOfPosts2, setListOfPosts2] = useState([])
    let [isFetchingPosts, setIsFetchingPosts] = useState(false)
    let [profileUsername, setProfileUsername] = useState(window.location.pathname.slice(9))
    let [isShowingFeed, setIsShowingFeed] = useState(true)
    let [listOfLikedPosts, setListOfLikedPosts] = useState([])
    let [isFetchingLikedPosts, setIsFetchingLikedPosts] = useState(false)
    let [likedData2, setLikedData2] = useState({})
    let [showSettings, setShowSettings] = useState(false)
    let [isLikedPostsEmpty, setIsLikedPostsEmpty] = useState(false)
    let [isLikedPostsPrivate, setIsLikedPostsPrivate] = useState(false)
    let [showFollowersModal, setShowFollowersModal] = useState(false)
    let [followersMode, setFollowersMode] = useState(false)

    const auth = useContext(AuthContext)

    function detailedCard2() {
        setCardClick2(true)
    }

    function closeCard2(event) {
        if (event.target.className === "backdrop" || event.target.className === "fa-solid fa-xmark medium-x") setCardClick2(false)
    }

    async function fetchProfilePosts() {
        setIsFetchingPosts(true)
        const response = await fetch("http://localhost:5000/profile/fetchProfilePosts", {
            method: "POST",
            body: JSON.stringify({
                profileUsername: profileUsername
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    async function getFetchedProfilePosts(cb) {
        const fetchedPosts = await cb()

        setListOfPosts2([...fetchedPosts])
        setIsFetchingPosts(false)
    }

    useEffect(() => {
        getFetchedProfilePosts(fetchProfilePosts)
    }, [])

    function detailedCardDataHandler2(detailedPostData2, likedStatus, onLikeHandler, onUnlikeHandler) {
        setDetailedCardData2(detailedPostData2)
        setLikedData2({
            likedStatus,
            onLikeHandler,
            onUnlikeHandler
        })
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

        if (data.username !== auth.username) setIsLikedPostsPrivate(data.privateLikedPosts)
        if (auth.username === profileUsername) setIsSelfProfile(true)

        data.followers.forEach(follower => {
            if (follower.loggedInUsername === auth.username) setIsFollowing(true)
        })

        setDataFetched(true)
    }

    useEffect(() => {
        fetchUserProfile(profileUsername)
    }, [])

    async function followHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/home/follow", {
            method: "POST",
            body: JSON.stringify({
                "loggedInUserId": auth.userId,
                "loggedInUsername": auth.username,
                "followedUserId": userData._id,
                "followedUsername": userData.username,
                "loggedInUserProfilePicture": auth.profilePicture,
                "loggedInUserVerified": auth.verified,
                "followedUserProfilePicture": userData.profilePicture,
                "followedUserVerified": userData.verified
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()

        auth.followUpdate({followedUserId: userData._id, followedUsername: userData.username})
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
                "followedUsername": userData.username,
                "loggedInUserProfilePicture": auth.profilePicture,
                "loggedInUserVerified": auth.verified,
                "followedUserProfilePicture": userData.profilePicture,
                "followedUserVerified": userData.verified
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()

        auth.unfollowUpdate({followedUserId: userData._id, followedUsername: userData.username})
        window.location.reload()
    }

    async function fetchLikedPosts() {
        setIsFetchingLikedPosts(true)
        const response = await fetch("http://localhost:5000/profile/fetchLikedPosts", {
            method: "POST",
            body: JSON.stringify({
                profileUsername: profileUsername,
                likedPosts: userData.likedPosts
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    function showFeedPostsHandler() {
        setIsShowingFeed(true)
    }

    async function showLikedPostsHandler() {
        setIsShowingFeed(false)
        setIsFetchingLikedPosts(true)

        // if isLikedPostsEmpty is true, then just return the <p> tag, no need to fetch
        // if listOfLikedPosts is not empty, just return the already fetched list in state

        // if both are false that means this is the first time we've entered this block
        // if one or the other is true, don't enter because we've entered this block and decided on the state, just use the state it's already in
        if (!isLikedPostsEmpty && !listOfLikedPosts.length) {
            const fetchedLikedPosts = await fetchLikedPosts()
            if (!fetchedLikedPosts.length) setIsLikedPostsEmpty(true)
            setListOfLikedPosts(fetchedLikedPosts)
        }

        setIsFetchingLikedPosts(false)
    }

    function settingsHandler() {
        setShowSettings(true)
    }

    function closeCardHandler(event) {
        if (event.target.className === "settingsModalBackdrop" || event.target.className === "fa-solid fa-xmark xmark") setShowSettings(false)
    }

    function showFollowersModalHandler1() {
        setShowFollowersModal(true)
        setFollowersMode(true)
    }

    function showFollowersModalHandler2() {
        setShowFollowersModal(true)
        setFollowersMode(false)
    }

    function closeFollowersModalHandler(event) {
        if (event.target.className === "followersModalBackdrop" || event.target.className === "fa-solid fa-xmark followersxmark")
        setShowFollowersModal(false)
    }

    return (
        <div className="profilePageContainer">
            <div className="mainProfileBodyContainer">
                <div className="exitProfileContainer">
                    <Link to="/home" className="fa-solid fa-arrow-left"></Link>
                </div>
                <div className="mainProfileBodyIntroContainer">
                    <img className="mainProfileIntroPic" src={dataFetched ? userData ? "http://localhost:5000/" + userData.profilePicture : null : null} alt=""></img>
                    <div className="mainProfileIntroCredentialsContainer">
                        <div className="userCredentialsBox">
                            <p className="mainProfileNameText">{dataFetched && userData && userData.fullName}</p>
                        </div>
                        <div className="userCredentialsBox">
                            <p className="mainProfileUsernameText">{dataFetched && userData && "@" + userData.username}</p>
                            {dataFetched ? userData ? userData.verified ? <i className="fa-solid fa-square-check"></i> : null : null : null}
                        </div>
                    </div>
                    <div className="mainProfileIntroStatsContainer">
                        {showFollowersModal && <FollowersModal profileData={userData} onCloseCard={closeFollowersModalHandler} followersMode={followersMode}/>}
                        <div className="mainProfileFollowersContainer" onClick={showFollowersModalHandler1}>
                            <p className="mainProfileStatTitle">Followers</p>
                            <p className="mainProfileStatNumber">{dataFetched && userData && userData.followersNum}</p>
                        </div>
                        <div className="mainProfileFollowingContainer" onClick={showFollowersModalHandler2}>
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
                    {dataFetched ?
                            !isSelfProfile &&
                            (!isFollowing
                            ? <button className="followButton" onClick={followHandler}>Follow</button>
                            : <button className="unfollowButton" onClick={unfollowHandler}>Unfollow</button>)
                        : null
                    }
                    {dataFetched ? isSelfProfile && <button className="settingsButton" onClick={settingsHandler}>Settings</button> : null}

                    {showSettings && <SettingsModal onCloseCard={closeCardHandler}/>}

                    {dataFetched ? !isLikedPostsPrivate ? (!isShowingFeed ? <button className="showFeedPostsButton" onClick={showFeedPostsHandler}>Show Posts Feed</button> : <button className="showLikedPostsButton" onClick={showLikedPostsHandler}>Show Liked Posts</button>) : null : null}
                </div>
                {dataFetched ?
                    isShowingFeed ?
                        <div className="mainProfilePostsFeedContainer">
                            {cardClick2 && <HomeDetailedPostCard onCloseCard={closeCard2} likedCardData={likedData2} detailedCardData={detailedCardData2}/>}
                            {!isFetchingPosts ? listOfPosts2.map((post, index) => <HomePostCard onShowCard={detailedCard2} homePostCardData={post} onDetailedCardDataHandler={detailedCardDataHandler2} key={index}/>) : null}
                        </div> :
                        <div className="mainProfileLikedPostsContainer">
                            {cardClick2 && <HomeDetailedPostCard onCloseCard={closeCard2} likedCardData={likedData2} detailedCardData={detailedCardData2}/>}
                            {!isFetchingLikedPosts ? (isLikedPostsEmpty ? <p className="likedPostsEmptyText">So empty in here...</p> : listOfLikedPosts.map((post, index) => <HomePostCard onShowCard={detailedCard2} homePostCardData={post} onDetailedCardDataHandler={detailedCardDataHandler2} key={index}/>)) : null}
                        </div>
                : null
                }
            </div>
        </div>
    )
}

export default Profile
