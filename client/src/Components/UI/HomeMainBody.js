import React, { useContext, useRef, useState, useEffect } from "react";

import HomePostCard from './HomePostCard'
import TopCreatorContainer from "./TopCreatorContainer";
import HomeDetailedPostCard from "./HomeDetailedPostCard";
import HomeDropDown from "./HomeDropDown";
import HomeSearchDropDown from "./HomeSearchDropDown";

import { AuthContext } from "../../context/auth-context";

import './HomeMainBody.css'

import personal from './Images/personal.jpg'

function HomeMainBody(props) {
    let [cardClick, setCardClick] = useState(false)
    let [detailedData, setDetailedData] = useState({})
    let [dropdownBool, setDropdownBool] = useState(false)
    let [searchingBool, setSearchingBool] = useState(false)
    let [searchTerm, setSearchTerm] = useState('')
    let [receivedUsers, setReceivedUsers] = useState(null)
    let [listOfPosts, setListOfPosts] = useState([])
    let [addingPost, setAddingPost] = useState(false)

    const auth = useContext(AuthContext)

    let postTextData = useRef()

    function detailedCard() {
        setCardClick(true)
    }

    function closeCard(event) {
        if (event.target.className === "backdrop" || event.target.className === "fa-solid fa-xmark medium-x") setCardClick(false)
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
        let newPost = {
            'userId': auth.userId,
            'creatorUsername': auth.username,
            'mainText': postTextDataMain,
            'timePosted': Date.now(),
            'likes': [],
            'likeCount': 0,
            'comments': [],
            'commentCount': 0
        }

        const response = await fetch('http://localhost:5000/home/createPost', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
    }

    function detailedCardDataHandler(detailedPostData) {
        setDetailedData(detailedPostData)
    }

    async function fetchSearchedUsers() {
        let response = await fetch('http://localhost:5000/home/searchUsers', {
            method: 'POST',
            body: JSON.stringify({
                'searchTerm': searchTerm
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        let searchedUsers = await response.json()
        return searchedUsers
    }

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            getUsersData(fetchSearchedUsers)     // while fetching load spinner
        }, 500)

        return () => clearTimeout(typingTimeout)
    }, [searchTerm])

    async function getUsersData(cb) {
        const fetchedUsers = await cb()
        setSearchingBool(true)
        setReceivedUsers(fetchedUsers)
    }

    async function fetchPosts() {
        // if followers array empty, fetch any recent posts
        const response = await fetch("http://localhost:5000/home/fetchPosts", {
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
        return data
    }

    async function getFetchedPosts(cb) {
        const fetchedPosts = await cb()

        setListOfPosts([...fetchedPosts.findOneResponse, ...fetchedPosts.findAllResponse])
    }

    useEffect(() => {
        getFetchedPosts(fetchPosts)
    }, [])

    return (
        <div className="homeMainBodyContainer">
            <div className="homeMainBodyLeft">
                <div className="homeTextContainer">
                    <p className="homeText">Home</p>
                </div>
                <div className="statusUpdateContainer">
                    <div className="statusUpdateInputContainer">
                        <textarea className="statusUpdateInput" rows='4' cols='40' placeholder="How's your day been?" ref={postTextData}></textarea>
                    </div>
                    <button className="postStatusButton" onClick={addPostHandler}>Post</button>
                </div>

                <div className="homeFeedContainer">
                    {cardClick && <HomeDetailedPostCard onCloseCard={closeCard} detailedCardData={detailedData}/>}

                    {!addingPost ? (listOfPosts.map((post, index) => <HomePostCard onShowCard={detailedCard} homePostCardData={post} onDetailedCardDataHandler={detailedCardDataHandler} key={index}/>)) : null}
                </div>
            </div>
            <div className="homeMainBodyRight">
                <div className="profileContainer" onClick={dropdownHandler} onMouseLeave={dropdownHandlerClose}>
                    <p className="profileUsername">{"@" + auth.username}</p>
                    <img src={personal} className="profileImg" alt=""/>
                    {dropdownBool && <HomeDropDown />}
                </div>
                <div className="searchContainer">
                    <input className="searchInput" placeholder="Find a User" onChange={(e) => setSearchTerm(e.target.value)}></input>
                    {searchingBool && <HomeSearchDropDown fetchedUsersArr={receivedUsers} />}
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
