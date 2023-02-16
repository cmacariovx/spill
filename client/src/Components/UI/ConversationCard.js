import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

import './ConversationCard.css'

import personal from './Images/personal.jpg'

function ConversationCard(props) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [ conversationData, setConversationData ] = useState(props.conversationData)
    const [ conversationId, setConversationId ] = useState(props.conversationData._id)

    function openConversationHandler() {
        // use convo id to open a room with it

        // props.onJoinRoom(conversationId, conversationData)
        navigate("/messages/" + conversationId)

        // socket io --can-- provde real time bidirectional interaction but if both users arent logged in at the same time, the database will store messages anyway and load them upon rendering of convo
    }

    return (
        <div className="conversationCard" onClick={openConversationHandler}>
            <div className="conversationPicContainer">
                <img src={conversationData.createdUsername !== auth.username ? "http://localhost:5000/" + conversationData.createdCreatorProfilePicture : "http://localhost:5000/" + conversationData.receivingCreatorProfilePicture} className="conversationPreviewImg"/>
            </div>
            <div className="conversationPreviewContainer">
                <div className="conversationPreviewUsernameContainer">
                    <p className={(!conversationData.latestMessageSent.messageOpened && auth.username !== conversationData.latestMessageSent.createdUsername) ? "conversationPreviewUsername2" : "conversationPreviewUsername"}>{conversationData.createdUsername !== auth.username ? "@" + conversationData.createdUsername : "@" + conversationData.receivingUsername}</p>
                </div>
                <div className="messagePreviewContainer">
                    <p className={(!conversationData.latestMessageSent.messageOpened && auth.username !== conversationData.latestMessageSent.createdUsername) ? "messagePreviewText2" : "messagePreviewText"}>
                        {conversationData.latestMessageSent.createdUsername !== auth.username ?
                        conversationData.latestMessageSent.messageText :
                        "You: " + conversationData.latestMessageSent.messageText}
                    </p>
                </div>
            </div>
            <div className="unreadMessageContainer">
                {(!conversationData.latestMessageSent.messageOpened && auth.username !== conversationData.latestMessageSent.createdUsername) ? <i class="fa-solid fa-circle"></i> : null}
            </div>
        </div>
    )
}

export default ConversationCard
