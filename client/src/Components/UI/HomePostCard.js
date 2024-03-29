import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";

import './HomePostCard.css'

import personal from './Images/personal.jpg'
import HomeOptionsPostDropDown from "./HomeOptionsPostDropDown";

function HomePostCard(props) {
    const auth = useContext(AuthContext)

    let [currentPostCardData, setCurrentPostCardData] = useState(props.homePostCardData)
    let [showPostOptions, setShowPostOptions] = useState(false)

    let likeBool

    props.homePostCardData.likes.forEach(user => {
        if (user.loggedInUsername === auth.username) likeBool = true
    })

    let [likedStatus, setLikedStatus] = useState(likeBool ? true : false)

    function sendCardData() {
        props.onDetailedCardDataHandler(currentPostCardData, likedStatus, onLikeHandler, onUnlikeHandler)
    }

    async function onLikeHandler(event) {
        event.preventDefault()
        currentPostCardData.likeCount += 1
        setCurrentPostCardData(currentPostCardData)
        setLikedStatus(true)

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "home/likePost", {
            method: "POST",
            body: JSON.stringify({
                loggedInUserId: auth.userId,
                loggedInUsername: auth.username,
                postId: props.homePostCardData._id,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    async function onUnlikeHandler(event) {
        event.preventDefault()
        currentPostCardData.likeCount -= 1
        setCurrentPostCardData(currentPostCardData)
        setLikedStatus(false)

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "home/unlikePost", {
            method: "POST",
            body: JSON.stringify({
                loggedInUserId: auth.userId,
                loggedInUsername: auth.username,
                postId: props.homePostCardData._id, //////// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    let falseOpen = ["postCardLikeContainer", "fa-regular fa-thumbs-up", "likeCount", "postCardLikeContainer2", "fa-solid fa-ellipsis", "postCardUserContainer1", "postCardUserContainer2", "postCardUsername", "postCardUserPic", "homeOptionsPostDropDownContainer", "deletePostContainer", "deletePostText", "exitPostOptionsContainer", "fa-solid fa-xmark small-x"]

    function openCardHandler(event) {
        if (falseOpen.includes(event.target.className)) {
            return null
        }
        else {
            props.onShowCard()
            sendCardData()
        }
    }

    function postOptionsHandler() {
        setShowPostOptions(true)
    }

    return (
        <div className="homePostCardContainer" onClick={openCardHandler}>
            <div className="postCardUserContainer">
                <Link to={"/profile/" + props.homePostCardData.creatorUsername} className="postCardUserContainer1">
                    <img className="postCardUserPic" src={process.env.REACT_APP_AWS_IMAGE_URL + props.homePostCardData.creatorProfilePicture} alt=""/>
                    <p className="postCardUsername">{"@" + props.homePostCardData.creatorUsername}</p>
                    {currentPostCardData.creatorVerified ? <i className="fa-solid fa-square-check searchMenuCheck"></i> : null}
                </Link>
                {props.homePostCardData.creatorUsername === auth.username && <div className="postCardUserContainer2">
                    {!showPostOptions && <i className="fa-solid fa-ellipsis" onClick={postOptionsHandler}></i>}
                    {showPostOptions && <HomeOptionsPostDropDown postData={props.homePostCardData} setShowPostOptionsHandler={setShowPostOptions}/>}
                </div>}
            </div>
            <div className="postCardBodyContainer">
                <p className="postMainText">{props.homePostCardData.mainText}</p>
            </div>
            <div className="postCardInteractContainer">
                <div className={!likedStatus ? "postCardLikeContainer" : "postCardLikeContainer2"} onClick={!likedStatus ? onLikeHandler : onUnlikeHandler}>
                    <i className="fa-regular fa-thumbs-up"></i>
                    <p className="likeCount">{currentPostCardData.likeCount}</p>
                </div>
                <div className="postCardCommentCountContainer">
                    <i className="fa-regular fa-comment"></i>
                    <p className="likeCount">{currentPostCardData.commentCount}</p>
                </div>
            </div>
        </div>
    )
}

export default HomePostCard
