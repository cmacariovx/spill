import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

import './HomeCommentCard.css'

import userProfilePic from './Images/personal.jpg'

function HomeCommentCard(props) {
    let [currentCommentData, setCurrentCommentData] = useState(props.commentData)

    const auth = useContext(AuthContext)

    async function deleteCommentHandler() {
        const response = await fetch("http://localhost:5000/home/deleteComment", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId,
                postId: props.homePostData._id, // remove from post comments array
                commentId: currentCommentData._id // remove from comments collection
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        // window.location.reload()
        return data
    }

    return (
        <div className="homeCommentCardContainer">
            <div className="homeCommentProfileContainer">
                <img className="homeCommentProfilePic" src={userProfilePic} alt=""></img>
                <p className="homeCommentUsername">{props.commentData.commentUsername}</p>
            </div>
            <div className="homeCommentBodyContainer">
                <p className="homeCommentBodyText">{props.commentData.commentBodyText}</p>
            </div>
            <div className="homeCommentDeleteContainer">
                <i className="fa-solid fa-trash" onClick={deleteCommentHandler}></i>
            </div>
        </div>
    )
}

export default HomeCommentCard
