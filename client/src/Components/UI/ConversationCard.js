import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import './ConversationCard.css'

import personal from './Images/personal.jpg'

function ConversationCard(props) {
    const auth = useContext(AuthContext)

    const [ conversationData, setConversationData ] = useState(props.conversationData)
    const [ conversationId, setConversationId ] = useState(props.conversationData._id)

    function openConversationHandler() {
        // use convo id to open a room with it
        props.onJoinRoom(conversationId, conversationData)

        // socket io --can-- provde real time bidirectional interaction but if both users arent logged in at the same time, the database will store messages anyway and load them upon rendering of convo
    }

    return (
        <Link className="conversationCard" to={"/messages/" + conversationId} onClick={openConversationHandler}>
            <div className="conversationPicContainer">
                <img src={personal} className="conversationPreviewImg"/>
            </div>
            <div className="conversationPreviewContainer">
                <div className="conversationPreviewUsernameContainer">
                    <p className="conversationPreviewUsername">{conversationData.createdUsername !== auth.username ? "@" + conversationData.createdUsername : "@" + conversationData.receivingUsername}</p>
                </div>
                <div className="messagePreviewContainer">
                    <p className="messagePreviewText">
                        {conversationData.latestMessageSent.createdUsername !== auth.username ?
                        "@" + conversationData.latestMessageSent.createdUsername + ": " + conversationData.latestMessageSent.messageText :
                        "You: " + conversationData.latestMessageSent.messageText}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ConversationCard
