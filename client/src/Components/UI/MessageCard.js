import React, { useState } from "react";

import './MessageCard.css'

import personal from './Images/personal.jpg'

function MessageCard(props) {
    const [timestamp, setTimestamp] = useState(props.message.timeCreated)
    const time = new Date(props.message.timeCreated)
    return (
        <div className="messageFeedCard">
            <div className="messageFeedPicContainer">
                <img src={personal} className="messageFeedPic"/>
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
