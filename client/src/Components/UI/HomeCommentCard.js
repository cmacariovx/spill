import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

import './HomeCommentCard.css'

import userProfilePic from './Images/personal.jpg'

function HomeCommentCard(props) {

    // update state -------------- lowest commment gets duplicated
    let [currentCommentData, setCurrentCommentData] = useState(props.commentData)

    const auth = useContext(AuthContext)

    async function deleteCommentHandler() {
        props.onUpdateListOfComments()
        console.log(currentCommentData)

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "home/deleteComment", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId,
                postId: props.homePostData._id,
                commentId: currentCommentData._id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    return (
        <div className="homeCommentCardContainer">
            <div className="homeCommentProfileContainer">
                <img className="homeCommentProfilePic" src={process.env.REACT_APP_BACKEND_URL + props.commentData.creatorProfilePicture} alt=""></img>
                <p className="homeCommentUsername">{props.commentData.commentUsername}</p>
                {currentCommentData.creatorVerified ? <i className="fa-solid fa-square-check commentCheck"></i> : null}
            </div>
            <div className="homeCommentBodyContainer">
                <p className="homeCommentBodyText">{props.commentData.commentBodyText}</p>
            </div>
            <div className="homeCommentDeleteContainer">
                {props.commentData.commentUsername === auth.username ? <i className="fa-solid fa-trash" onClick={deleteCommentHandler}></i> : null}
            </div>
        </div>
    )
}

export default HomeCommentCard
