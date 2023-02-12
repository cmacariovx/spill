import React, { useState, useRef, useEffect, useContext } from "react";
import io from 'socket.io-client'
import { AuthContext } from "../../context/auth-context";
import ConversationCard from "./ConversationCard";

import HomeSearchDropDown from "./HomeSearchDropDown";

import './MessagesBody.css'
import personal from './Images/personal.jpg'

function MessagesBody() {
    const auth = useContext(AuthContext)
    let socket = io.connect("http://localhost:5001") // set to mainbody so we can get messages outside of just messagebody and just pass down all the way through props

    const messageInput = useRef()

    const [conversationId, setConversationId] = useState("")
    const [showSearchContainer, setShowSearchContainer] = useState(false)
    const [allConversationUsersArr, setAllConversationUsersArr] = useState([])
    const [fetchingConversationUsers, setFetchingConversationUsers] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [currentlySearchingBool, setCurrentlySearchingBool] = useState(false)
    const [receivedConversationUsers, setReceivedConversationUsers] = useState([])
    const [listOfConversations, setListOfConversations] = useState([])
    const [fetchingConversations, setFetchingConversations] = useState(false)
    const [conversationData, setConversationData] = useState({})
    const [conversationMessages, setConversationMessages] = useState([])

    function joinRoom(conversationId, conversationData) {
    // on click of conversation card (through props) this is ran with conversationId passed up from card

    // conversation data is now available here from convo card to display on message body
        if (conversationId !== "") {
            socket.emit("joinConversation", conversationId)
            setConversationId(conversationId)
            setConversationData(conversationData)
            setConversationMessages(conversationData.messages)
        }
    }

    async function sendMessageHandler(event) {
        event.preventDefault()

        const message = messageInput.current.value

        const timeCreated = Date.now()

        socket.emit("sendMessage",
        {
            conversationId: conversationId,
            createdUserId: auth.userId,
            createdUsername: auth.username,
            messageText: message,
            timeCreated: timeCreated
        })

        const response = await fetch('http://localhost:5000/message/createMessage', {
            method: 'POST',
            body: JSON.stringify({
                conversationId: conversationId,
                createdUserId: auth.userId,
                createdUsername: auth.username,
                messageText: message,
                timeCreated: timeCreated
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        const data = await response.json()
        console.log(data)
    }

    useEffect(() => {
        socket.on("showMessage", (data) => {
            setConversationMessages((prevList) => {
                return [...prevList, data]
            })
        })
    }, [socket])

    function showContainerHandler() {
        setShowSearchContainer(true)
    }

    async function fetchConversationUsers() {
        setFetchingConversationUsers(true)
        let response = await fetch('http://localhost:5000/home/searchUsers', {
            method: 'POST',
            body: JSON.stringify({
                'searchTerm': searchInput
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        let allConversationUsers = await response.json()
        setAllConversationUsersArr(allConversationUsers)
        setFetchingConversationUsers(false)

        return allConversationUsers
    }

    useEffect(() => {
        setCurrentlySearchingBool(true)

        let returnArr = []

        allConversationUsersArr.filter(user => {
            if (user.username.includes(searchInput)) {
                returnArr.push(user)
            }
        })

        setReceivedConversationUsers(returnArr)

        if (!searchInput) setCurrentlySearchingBool(false)
    }, [searchInput])

    async function fetchAllConversations() {
        setFetchingConversations(true)
        const response = await fetch("http://localhost:5000/message/fetchAllConversations", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        setFetchingConversations(false)
        return data
    }

    async function getFetchedConversations(cb) {
        const fetchedConversations = await cb()
        setListOfConversations([...fetchedConversations])
    }

    useEffect(() => {
        if (!allConversationUsersArr.length) fetchConversationUsers()
        getFetchedConversations(fetchAllConversations)
    }, [])

    return (
        <div className="messagesBodyContainer">
            <div className="messagesBody">
                <div className="messagesBodyTitleContainer">
                    <p className="messagesBodyTitle">Messages</p>
                </div>
                <div className="mainMessagesContainer">
                    <div className="mainMessagesContainerLeft">
                        <div className="mainMessagesContainerLeftTitleContainer">
                            <p className="mainMessagesContainerLeftTitle">Conversations</p>
                        </div>
                        {!showSearchContainer ? <div className="addMessageContainer" onClick={showContainerHandler}>
                            <div className="addMessageContainer2">
                                <p className="addMessageText">New Message</p>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                        </div> :
                        <div className="searchUsersContainer">
                            <input className="searchUsersInput" onChange={(e) => setSearchInput(e.target.value)}></input>
                            {!fetchingConversationUsers ? currentlySearchingBool && <HomeSearchDropDown fetchedUsersArr={receivedConversationUsers} dmClass={true}/> : null}
                        </div>}
                        <div className={!showSearchContainer ? "conversationsListContainer" : "conversationsListContainer2"}>
                            {!fetchingConversations ?
                                listOfConversations.length ?
                                    listOfConversations.map((conversation, i) =>
                                    <ConversationCard conversationData={conversation} onJoinRoom={joinRoom} key={i}/>) : null : null}
                        </div>
                    </div>
                    <div className="mainMessagesContainerRight">
                        <div className="messageFeedContainer">
                            {conversationMessages.length ? conversationMessages.map((message, i) =>
                                <div className="messageFeedCard" key={i}>
                                    <div className="messageFeedPicContainer">
                                        <img src={personal} className="messageFeedPic"/>
                                    </div>
                                    <div className="messageFeedBodyContainer">
                                        <div className="messageFeedUsernameContainer">
                                            <p className="messageFeedUsername">{"@" + message.createdUsername}</p>
                                            <p className="messageFeedTimePosted">{message.timeCreated}</p>
                                        </div>
                                        <div className="messageFeedTextContainer">
                                            <p className="messageFeedText">{message.messageText}</p>
                                        </div>
                                    </div>
                                </div>) : null}
                        </div>
                        <div className="mainInputContainer">
                            <input className="messageInput" ref={messageInput}></input>
                            <button className="sendMessageButton" onClick={sendMessageHandler}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesBody
