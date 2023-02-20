import React, { useState } from "react";

import './MessageCard.css'

import personal from './Images/personal.jpg'

function MessageCard(props) {
    const time = new Date(props.message.timeCreated)
    return (
        <div className="messageFeedCard">
            <div className="messageFeedPicContainer">
                <img src={process.env.REACT_APP_AWS_IMAGE_URL + props.message.creatorProfilePicture} className="messageFeedPic"/>
            </div>
            <div className="messageFeedBodyContainer">
                <div className="messageFeedUsernameContainer">
                    <p className="messageFeedUsername">{"@" + props.message.createdUsername}</p>
                    <p className="messageFeedTimePosted">{time.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</p>
                </div>
                <div className="messageFeedTextContainer">
                    <p className="messageFeedText">{props.message.messageText}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageCard
