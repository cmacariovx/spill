import React, { useRef, useState } from "react";

import HomePostCard from './HomePostCard'
import TopCreatorContainer from "./TopCreatorContainer";
import HomeDetailedPostCard from "./HomeDetailedPostCard";
import HomeDropDown from "./HomeDropDown";

import './HomeMainBody.css'

import personal from './Images/personal.jpg'

function HomeMainBody() {
    let [cardClick, setCardClick] = useState(false)
    let [detailedData, setDetailedData] = useState({})
    let [dropdownBool, setDropdownBool] = useState(false)

    let postTextData = useRef()

    function detailedCard() {
        setCardClick(true)
    }

    function closeCard(event) {
        if (event.target.className === "backdrop" || event.target.className === "fa-solid fa-xmark") setCardClick(false)
    }

    function detailedCardDataHandler(enteredDetailedCardDataObj) {
        let detailedCardDataObj = {
            ...enteredDetailedCardDataObj,
            id: Math.random().toString()
        }

        setDetailedData(detailedCardDataObj)
    }

    function dropdownHandler(event) {
        setDropdownBool(true)
        console.log(event)
    }

    function dropdownHandlerClose() {
        if (dropdownBool) setDropdownBool(false)
    }

    function addPostHandler() {
        let postTextDataMain = postTextData.current.value
        console.log(postTextDataMain)
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
                    <HomePostCard onShowCard={detailedCard} onDetailedCardDataHandler={detailedCardDataHandler}/>
                    <HomePostCard onShowCard={detailedCard} onDetailedCardDataHandler={detailedCardDataHandler}/>
                    <HomePostCard onShowCard={detailedCard} onDetailedCardDataHandler={detailedCardDataHandler}/>
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
