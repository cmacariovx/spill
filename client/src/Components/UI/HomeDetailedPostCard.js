import React, { useState, useRef } from "react";

import './HomeDetailedPostCard.css'

import profilePicDetailed from './Images/personal.jpg'

import HomeCommentCard from "./HomeCommentCard";

function HomeDetailedPostCard(props) {
    let [detailedCardData, setDetailedCardData] = useState(props.detailedCardData)

    let commentsMainList = [
        {
            'commentUsername': '@cmacariovx',
            'commentBodyText': 'Agreed!',
        },
        {
            'commentUsername': '@anon1234',
            'commentBodyText': 'Yea for sure',
        },
        {
            'commentUsername': '@guest444',
            'commentBodyText': 'Ehh not seeing it.',
        },
        {
            'commentUsername': '@0re',
            'commentBodyText': 'Lets run some duos',
        }
    ]

    let [listOfComments, setListOfComments] = useState(commentsMainList)

    let currentCommentData = useRef()

    function addCommentHandler() {
        let newComment = {
            'commentUsername': '@cmacariovx',
            'commentBodyText': currentCommentData.current.value,
        }

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
                        <p className="homeDetailedProfileUsername">{detailedCardData.username}</p>
                    </div>
                    <div className="homeDetailedPostContainer">
                        <p className="homeDetailedPostText">{detailedCardData.mainBodyText}</p>
                    </div>
                    <div className="homeDetailedInteractContainer">
                        <i className="fa-regular fa-thumbs-up fa-222"></i>
                        <p className="homeLikeCount">{detailedCardData.likeCount}</p>
                    </div>
                </div>
                <div className="homeDetailedRightBody">
                    <div className="homeDetailedCloseButtonContainer">
                        <p className="homeDetailedCommentsTitle">Comments</p>
                        <i className="fa-solid fa-xmark" onClick={props.onCloseCard}></i>
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
