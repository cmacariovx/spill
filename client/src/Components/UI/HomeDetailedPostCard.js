import React, { useState, useRef, useContext, useEffect } from "react";

import './HomeDetailedPostCard.css'

import profilePicDetailed from './Images/personal.jpg'

import HomeCommentCard from "./HomeCommentCard";
import { AuthContext } from "../../context/auth-context";

function HomeDetailedPostCard(props) {
    let [detailedCardData, setDetailedCardData] = useState(props.detailedCardData)
    let [listOfComments, setListOfComments] = useState([])

    let currentCommentData = useRef()

    const auth = useContext(AuthContext)

    useEffect(() => {
        setListOfComments(detailedCardData.comments)
    }, [])

    async function addCommentHandler() {
        let newComment = {
            'postId': detailedCardData._id,
            'postCreatorId': detailedCardData.userId,
            'postCreatorUsername': detailedCardData.creatorUser,
            'commentUserId': auth.userId,
            'commentUsername': auth.username,
            'commentBodyText': currentCommentData.current.value,
            'commentTimePosted': Date.now()
        }

        const response = await fetch("http://localhost:5000/home/createComment", {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()

        setListOfComments(prevListOfComments => {
            return [newComment, ...prevListOfComments]
        })
    }

    return (
        <div className="backdrop" onClick={props.onCloseCard}>
            <div className="homeDetailedPostCard">
                <div className="homeDetailedLeftBody">
                    <div className="homeDetailedProfileContainer">
                        <img src={profilePicDetailed} className="homeDetailedProfilePic" alt=""></img>
                        <p className="homeDetailedProfileUsername">{"@" + detailedCardData.creatorUsername}</p>
                    </div>
                    <div className="homeDetailedPostContainer">
                        <p className="homeDetailedPostText">{detailedCardData.mainText}</p>
                    </div>
                    <div className="homeDetailedInteractContainer">
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
                        {listOfComments.map((comment, index) => <HomeCommentCard commentData={comment} key={index}/>)}
                    </div>
                    <div className="homeDetailedCommentsInputContainer">
                        <input className="homeDetailedCommentsInput" placeholder="Add a Comment" ref={currentCommentData}></input>
                        <i className="fa-regular fa-paper-plane homeDetailedPostCommentButton" onClick={addCommentHandler}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDetailedPostCard
