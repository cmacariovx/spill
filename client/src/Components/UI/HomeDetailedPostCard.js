import React, { useState, useRef, useContext, useEffect } from "react";

import './HomeDetailedPostCard.css'

import profilePicDetailed from './Images/personal.jpg'

import HomeCommentCard from "./HomeCommentCard";
import { AuthContext } from "../../context/auth-context";
import LoadingSpinner from "./LoadingSpinner";

function HomeDetailedPostCard(props) {
    let [detailedCardData, setDetailedCardData] = useState(props.detailedCardData)
    let [likedData, setLikedData] = useState(props.likedCardData)
    let [likedStatus, setLikedStatus] = useState(props.likedCardData.likedStatus) // not receiving liked card data
    let [listOfComments, setListOfComments] = useState([])
    let [fetchingComments, setFetchingComments] = useState(true)

    let currentCommentData = useRef()

    const auth = useContext(AuthContext)

    async function fetchComments() {
        const response = await fetch("http://localhost:5000/home/fetchComments", {
            method: "POST",
            body: JSON.stringify({
                postId: detailedCardData._id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        setFetchingComments(false)
        return data
    }

    async function getFetchedComments(cb) {
        const fetchedComments = await cb()

        setListOfComments([...fetchedComments])
    }

    useEffect(() => {
        getFetchedComments(fetchComments)
    }, [])

    async function addCommentHandler() {
        setFetchingComments(true)
        detailedCardData.commentCount += 1
        setDetailedCardData(detailedCardData)

        // problem is no id here
        let newComment = {
            'postId': detailedCardData._id,
            'postCreatorId': detailedCardData.userId,
            'postCreatorUsername': detailedCardData.creatorUsername,
            'commentUserId': auth.userId,
            'commentUsername': auth.username,
            'commentBodyText': currentCommentData.current.value,
            'commentTimePosted': Date.now(),
            'creatorVerified': auth.verified,
            'creatorProfilePicture': auth.profilePicture
        }

        currentCommentData.current.value = ""

        const response = await fetch("http://localhost:5000/home/createComment", {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()

        newComment._id = data.response1.insertedId
        setListOfComments(prevListOfComments => {
            return [newComment, ...prevListOfComments]
        })

        setFetchingComments(false)
        return data
    }

    function updateListOfComments() {
        setListOfComments(prevListOfComments => {
            prevListOfComments.shift()
            return [...prevListOfComments]
        })
    }

    function likeHandler(event) {
        likedData.onLikeHandler(event)
        setLikedStatus(true)
    }

    function unlikeHandler(event) {
        likedData.onUnlikeHandler(event)
        setLikedStatus(false)
    }

    return (
        <div className="backdrop" onClick={props.onCloseCard}>
            <div className="homeDetailedPostCard">
                <div className="homeDetailedLeftBody">
                    <div className="homeDetailedProfileContainer">
                        <img src={"http://localhost:5000/" + detailedCardData.creatorProfilePicture} className="homeDetailedProfilePic" alt=""></img>
                        <p className="homeDetailedProfileUsername">{"@" + detailedCardData.creatorUsername}</p>
                    </div>
                    <div className="homeDetailedPostContainer">
                        <p className="homeDetailedPostText">{detailedCardData.mainText}</p>
                    </div>
                    <div className={!likedStatus ? "homeDetailedInteractContainer1" : "homeDetailedInteractContainer2"} onClick={!likedStatus ? likeHandler : unlikeHandler}>
                        <i className="fa-regular fa-thumbs-up fa-222"></i>
                        <p className="homeLikeCount">{detailedCardData.likeCount}</p>
                    </div>
                </div>
                <div className="homeDetailedRightBody">
                    <div className="homeDetailedCloseButtonContainer">
                        <p className="homeDetailedCommentsTitle">Comments</p>
                        <i className="fa-solid fa-xmark medium-x" onClick={props.onCloseCard}></i>
                    </div>
                    <div className="homeDetailedCommentsFeedContainer">
                        {fetchingComments && <LoadingSpinner />}
                        {!fetchingComments ? listOfComments.map((comment, index) => <HomeCommentCard commentData={comment} homePostData={detailedCardData} onUpdateListOfComments={updateListOfComments} key={comment._id}/>) : null}
                    </div>
                    <div className="homeDetailedCommentsInputContainer">
                        <input className="homeDetailedCommentsInput" maxLength="64" placeholder="Add a Comment" ref={currentCommentData}></input>
                        <i className="fa-regular fa-paper-plane homeDetailedPostCommentButton" onClick={addCommentHandler}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDetailedPostCard
