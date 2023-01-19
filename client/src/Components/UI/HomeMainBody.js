import React, { useContext, useRef, useState } from "react";

import HomePostCard from './HomePostCard'
import TopCreatorContainer from "./TopCreatorContainer";
import HomeDetailedPostCard from "./HomeDetailedPostCard";
import HomeDropDown from "./HomeDropDown";

import { AuthContext } from "../../context/auth-context";

import './HomeMainBody.css'

import personal from './Images/personal.jpg'

function HomeMainBody() {
    let [cardClick, setCardClick] = useState(false)
    let [detailedData, setDetailedData] = useState({})
    let [dropdownBool, setDropdownBool] = useState(false)

    const auth = useContext(AuthContext)

    let postTextData = useRef()

    function detailedCard() {
        setCardClick(true)
    }

    function closeCard(event) {
        if (event.target.className === "backdrop" || event.target.className === "fa-solid fa-xmark") setCardClick(false)
    }

    function dropdownHandler(event) {
        setDropdownBool(true)
        console.log(event)
    }

    function dropdownHandlerClose() {
        if (dropdownBool) setDropdownBool(false)
    }

    async function addPostHandler() {
        let postTextDataMain = postTextData.current.value
        let newPost = {
            'userId': auth.userId,
            'mainText': postTextDataMain,
            'timePosted': Date.now(),
            'likeCount': 0,
            'comments': []
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

        setListOfPosts(prevListOfPosts => {  // change to db fetch
            return [newPost, ...prevListOfPosts]
        })
    }

    let mainPostFeedPosts = [ // load an array of 10
        {
            'userId': '@cmacariovx',
            'mainText': 'Warzone 2 is looking a bit more polished now!',
            'timePosted': Date.now(),
            'likeCount': 543,
            'comments': []
        },
        {
            'userId': '@anon123',
            'mainText': 'Testing',
            'timePosted': Date.now(),
            'likeCount': 2,
            'comments': []
        },
        {
            'userId': '@guest444',
            'mainText': 'Does Socia have star potential?',
            'timePosted': Date.now(),
            'likeCount': 991,
            'comments': []
        }
    ]

    let [listOfPosts, setListOfPosts] = useState(mainPostFeedPosts)

    function detailedCardDataHandler(detailedPostData) {
        setDetailedData(detailedPostData)
    }

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
                    {listOfPosts.map((post, index) => <HomePostCard onShowCard={detailedCard} homePostCardData={post} onDetailedCardDataHandler={detailedCardDataHandler} key={index}/>)}
                </div>
            </div>
            <div className="homeMainBodyRight">
                <div className="profileContainer" onClick={dropdownHandler} onMouseLeave={dropdownHandlerClose}>
                    <p className="profileUsername">@cmacariovx</p>
                    <img src={personal} className="profileImg" alt=""/>
                    {dropdownBool && <HomeDropDown />}
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
