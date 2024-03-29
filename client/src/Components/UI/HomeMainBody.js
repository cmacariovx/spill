import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'

import HomePostCard from './HomePostCard'
import TopCreatorContainer from "./TopCreatorContainer";
import HomeDetailedPostCard from "./HomeDetailedPostCard";
import HomeDropDown from "./HomeDropDown";
import HomeSearchDropDown from "./HomeSearchDropDown";
import SettingsModal from "./SettingsModal";
import LoadingSpinner from "./LoadingSpinner";
import SideMenu from "./SideMenu";

import { AuthContext } from "../../context/auth-context";

import './HomeMainBody.css'

import personal from './Images/personal.jpg'

function HomeMainBody(props) {
    let [cardClick, setCardClick] = useState(false)
    let [detailedData, setDetailedData] = useState({})
    let [dropdownBool, setDropdownBool] = useState(false)
    let [searchingBool, setSearchingBool] = useState(false)
    let [searchTerm, setSearchTerm] = useState('')
    let [receivedUsers, setReceivedUsers] = useState([])
    let [listOfPosts, setListOfPosts] = useState([])
    let [addingPost, setAddingPost] = useState(false)
    let [likedData, setLikedData] = useState({})
    let [showSettings, setShowSettings] = useState(false)
    let [allUsersArr, setAllUsersArr] = useState([])
    let [fetchingUsers, setFetchingUsers] = useState(false)
    let [topCreatorsArr, setTopCreatorsArr] = useState([])
    let [fetchingPosts, setFetchingPosts] = useState(false)
    let [showInvalidPostButton, setShowInvalidPostButton] = useState(false)
    let [showMenu, setShowMenu] = useState(false)

    const auth = useContext(AuthContext)

    const navigate = useNavigate()

    let postTextData = useRef()

    function detailedCard() {
        setCardClick(true)
    }

    function closeCard(event) {
        if (event.target.className === "backdrop" || event.target.className === "fa-solid fa-xmark medium-x" || event.target.className === "fa-solid fa-xmark medium-x2") setCardClick(false)
    }

    function dropdownHandler(event) {
        setDropdownBool(true)
    }

    function dropdownHandlerClose() {
        if (dropdownBool) setDropdownBool(false)
    }

    async function addPostHandler() {
        setAddingPost(true)
        let postTextDataMain = postTextData.current.value
        if (postTextDataMain.trim() === "") {
            setAddingPost(false)
            return
        }
        let newPost = {
            'userId': auth.userId,
            'creatorUsername': auth.username,
            'mainText': postTextDataMain,
            'timePosted': Date.now(),
            'likes': [],
            'likeCount': 0,
            'comments': [],
            'commentCount': 0,
            'creatorVerified': auth.verified,
            'creatorProfilePicture': auth.profilePicture
        }

        postTextData.current.value = ""

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'home/createPost', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        const data = await response.json()
        setAddingPost(false)
        window.location.reload()
    }

    function detailedCardDataHandler(detailedPostData, likedStatus, onLikeHandler, onUnlikeHandler) {
        setDetailedData(detailedPostData)
        setLikedData({
            likedStatus,
            onLikeHandler,
            onUnlikeHandler
        })
    }

    async function fetchAllUsers() {
        setFetchingUsers(true)
        let response = await fetch(process.env.REACT_APP_BACKEND_URL + 'home/searchUsers', {
            method: 'POST',
            body: JSON.stringify({
                'searchTerm': searchTerm
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        let allUsers = await response.json()
        setAllUsersArr(allUsers)
        setFetchingUsers(false)

        setTopCreatorsArr(allUsers.sort((a, b) => b.followersNum - a.followersNum).slice(0, 5))
        return allUsers
    }

    useEffect(() => {
        setSearchingBool(true)

        let returnArr = []

        allUsersArr.filter(user => {
            if (user.username.includes(searchTerm.toLowerCase())) {
                returnArr.push(user)
            }
        })

        setReceivedUsers(returnArr)

        if (!searchTerm) setSearchingBool(false)
    }, [searchTerm])

    async function fetchPosts() {
        setFetchingPosts(true)
        // if followers array empty, fetch any recent posts
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "home/fetchPosts", {
            method: "POST",
            body: JSON.stringify({
                followingArr: auth.following,
                loggedInUsername: auth.username
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        setFetchingPosts(false)
        return data
    }

    async function getFetchedPosts(cb) {
        const fetchedPosts = await cb()

        setListOfPosts([...fetchedPosts])
    }

    useEffect(() => {
        getFetchedPosts(fetchPosts)
        if (!allUsersArr.length) fetchAllUsers()
    }, [])

    function closeCardHandler(event) {
        if (event.target.className === "settingsModalBackdrop" || event.target.className === "fa-solid fa-xmark xmark") setShowSettings(false)
    }

    function captureSettingsClick() {
        setShowSettings(true)
    }

    function toMessagesHandler() {
        navigate("/messages")
    }

    function showMenuHandler() {
        setShowMenu(true)
    }

    function closeMenuHandler() {
        setShowMenu(false)
    }

    return (
        <div className="homeMainBodyContainer">
            {showMenu && <SideMenu allUsers={allUsersArr} onCloseMenu={closeMenuHandler}/>}
            <div className="homeMainBodyLeft">
                <div className="homeTextContainer">
                    <p className="homeText">Home</p>
                    <i className="fa-solid fa-bars" onClick={showMenuHandler}></i>
                </div>
                <div className="statusUpdateContainer">
                    <div className="statusUpdateInputContainer">
                        <textarea className="statusUpdateInput" rows='4' cols='40' maxLength="160" placeholder="How's your day been?" ref={postTextData}></textarea>
                    </div>
                    <button className={!showInvalidPostButton ? "postStatusButton" : "postStatusButton2"} onClick={!showInvalidPostButton ? addPostHandler : null}>Post</button>
                </div>
                <div className="homeFeedContainer">
                    {(fetchingPosts || addingPost) && <LoadingSpinner height={"10%"}/>}
                    {cardClick && <HomeDetailedPostCard onCloseCard={closeCard} detailedCardData={detailedData} likedCardData={likedData}/>}
                    {!addingPost ? (listOfPosts.map((post, index) => <HomePostCard onShowCard={detailedCard} homePostCardData={post} onDetailedCardDataHandler={detailedCardDataHandler} key={index}/>)) : null}
                </div>
            </div>
            <div className="homeMainBodyRight">
                <div className="profileContainer" onClick={dropdownHandler} onMouseLeave={dropdownHandlerClose}>
                    <p className="profileUsername">{"@" + auth.username}</p>
                    <img src={process.env.REACT_APP_AWS_IMAGE_URL + auth.profilePicture} className="profileImg" alt=""/>
                    {dropdownBool && <HomeDropDown onCaptureSettingsClick={captureSettingsClick}/>}
                    {showSettings && <SettingsModal onCloseCard={closeCardHandler}/>}
                </div>
                <div className="messagesContainer" onClick={toMessagesHandler}>
                    <p className="messagesContainerText">DM's</p>
                    <i className="fa-solid fa-message"></i>
                </div>
                <div className={!searchingBool ? "searchContainer1" : "searchContainer2"}>
                    <input className="searchInput" placeholder="Find a user" onChange={(e) => setSearchTerm(e.target.value)}></input>
                    {!fetchingUsers ? searchingBool && <HomeSearchDropDown fetchedUsersArr={receivedUsers} dmClass={false}/> : null}
                </div>
                <div className="topCreatorsContainer">
                    {fetchingPosts && <LoadingSpinner height={"100%"}/>}
                    {!fetchingPosts &&
                        <div className="topCreatorsTitleContainer">
                            <p className="topCreatorsTitleText">Top Creators</p>
                        </div>
                    }
                    {!fetchingPosts &&
                        <div className="topCreatorsListContainer">
                            {!fetchingUsers ? topCreatorsArr.map((user, i) => <TopCreatorContainer currentUser={user} currentIndex={i + 1} key={user._id}/>) : null}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeMainBody
