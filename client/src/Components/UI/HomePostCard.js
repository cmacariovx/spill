import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

import './HomePostCard.css'

import personal from './Images/personal.jpg'

function HomePostCard(props) {
    const auth = useContext(AuthContext)

    let [likeCounter, setLikeCounter] = useState(props.homePostCardData.likeCount)
    let [commentCounter, setCommentCounter] = useState(props.homePostCardData.commentCount)

    let likeBool

    props.homePostCardData.likes.forEach(user => {
        if (user.loggedInUsername === auth.username) likeBool = true
    })

    let [likedStatus, setLikedStatus] = useState(likeBool ? true : false)

    function sendCardData() {
        props.onDetailedCardDataHandler(props.homePostCardData)
    }

    async function onLikeHandler(event) {
        event.preventDefault()
        setLikeCounter(likeCounter + 1)
        setLikedStatus(true)

        const response = await fetch("http://localhost:5000/home/likePost", {
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
        console.log(data)
        return data
    }

    async function onUnlikeHandler(event) {
        event.preventDefault()
        setLikeCounter(likeCounter - 1)
        setLikedStatus(false)

        const response = await fetch("http://localhost:5000/home/unlikePost", {
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
        console.log(data)
        return data
    }

    function likeCardHandler(event) {
        if (event.target.className === "postCardInteractContainer"
        || event.target.className === "fa-regular fa-thumbs-up"
        || event.target.className === "likeCount"
        || event.target.className === "postCardInteractContainer2") {
            return null
        }
        else {
            props.onShowCard()
            sendCardData()
        }
    }

    return (
        <div className="homePostCardContainer" onClick={likeCardHandler}>
            <div className="postCardUserContainer">
                <p className="postCardUsername">{"@" + props.homePostCardData.creatorUsername}</p>
                <img className="postCardUserPic" src={personal} alt=""/>
            </div>
            <div className="postCardBodyContainer">
                <p className="postMainText">{props.homePostCardData.mainText}</p>
            </div>
            <div className={!likedStatus ? "postCardInteractContainer" : "postCardInteractContainer2"} onClick={!likedStatus ? onLikeHandler : onUnlikeHandler}>
                <i className="fa-regular fa-thumbs-up"></i>
                <p className="likeCount">{likeCounter}</p>
            </div>
        </div>
    )
}

export default HomePostCard
