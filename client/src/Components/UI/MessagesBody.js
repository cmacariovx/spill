import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import io from 'socket.io-client'
import { AuthContext } from "../../context/auth-context";
import ConversationCard from "./ConversationCard";
import ScrollToBottom, { useAnimatingToEnd, useAnimating } from 'react-scroll-to-bottom'

import HomeSearchDropDown from "./HomeSearchDropDown";
import MessageCard from "./MessageCard";
import LoadingSpinner from "./LoadingSpinner";
import SmallUsersSearch from "./SmallUsersSearch";

import './MessagesBody.css'
import personal from './Images/personal.jpg'

function MessagesBody() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    // let socket = io.connect(process.env.REACT_APP_SOCKET_URL)
    let socket = io.connect()

    const messageInput = useRef()

    const convoId = window.location.pathname.slice(10)
    const [conversationId, setConversationId] = useState(convoId)
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
    const [showUserBanner, setShowUserBanner] = useState(false)
    const [conversationUsersList, setConversationUsersList] = useState([])
    const [smallSearchClick, setSmallSearchClick] = useState(false)

    useEffect(() => {
        if (convoId) {
            setConversationId(convoId)
                // fetch convo data
                async function loadConvo() {
                    async function fetchConvo() {
                        let response = await fetch(process.env.REACT_APP_BACKEND_URL + 'message/fetchConvo', {
                            method: 'POST',
                            body: JSON.stringify({
                                conversationId: convoId
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + auth.token
                            }
                        })

                        let data = await response.json()
                        return data
                    }

                    let conversation = await fetchConvo()
                    joinRoom(convoId, conversation)
                }

                loadConvo()
        }
    }, [convoId])

    function joinRoom(conversationId, conversationData1) {
        if (conversationId !== "") {
            setConversationId(conversationId)
            socket.emit("joinConversation", conversationId) // this creates the multiple message error because its changing switch
            setConversationData(conversationData1)
            setConversationMessages(conversationData1.messages)
            setShowUserBanner(true)

            async function readMessage() {
                let response = await fetch(process.env.REACT_APP_BACKEND_URL + 'message/readMessage', {
                    method: 'POST',
                    body: JSON.stringify({
                        conversationId: conversationId
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    }
                })

                let data = await response.json()
                return data
            }

            if (conversationData1.latestMessageSent.createdUsername !== auth.username && !conversationData1.latestMessageSent.openedMessage) readMessage()
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
            timeCreated: timeCreated,
            creatorProfilePicture: auth.profilePicture
        })

        messageInput.current.value = ""

        const response = await fetch(process.env.REACT_APP_BACKEND_URL+ 'message/createMessage', {
            method: 'POST',
            body: JSON.stringify({
                conversationId: conversationId,
                createdUserId: auth.userId,
                createdUsername: auth.username,
                messageText: message,
                timeCreated: timeCreated,
                creatorProfilePicture: auth.profilePicture
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    useEffect(() => {
        socket.on("showMessage", (data) => {
            console.log(data)
            setConversationMessages((prevList) => {
                return [...prevList, data]
            })
        })

    }, [socket])

    function showContainerHandler() {
        setShowSearchContainer(true)
        setSmallSearchClick(true)
    }

    async function fetchConversationUsers() {
        setFetchingConversationUsers(true)
        let response = await fetch(process.env.REACT_APP_BACKEND_URL + 'home/searchUsers', {
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
            if (user.username.includes(searchInput.toLowerCase()) && user.username !== auth.username && !conversationUsersList.includes(user.username)) {
                returnArr.push(user)
            }
        })

        setReceivedConversationUsers(returnArr)

        if (!searchInput) setCurrentlySearchingBool(false)
    }, [searchInput])

    async function fetchAllConversations() {
        setFetchingConversations(true)
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "message/fetchAllConversations", {
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

        let arr = []

        data.forEach((conversation) => {
            auth.username === conversation.createdUsername ? arr.push(conversation.receivingUsername) : arr.push(conversation.createdUsername)
        })

        setConversationUsersList(arr)

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

    function closeConversationHandler() {
        socket.emit("leaveConversation", conversationId)
        setConversationId("")
        setConversationData({})
        setConversationMessages([])
        setShowUserBanner(false)
        // reset url
        navigate("/messages")
        window.location.reload()
    }

    function homeHandler() {
        navigate("/home")
    }

    function fetchProfileHandler() {
        let nav = conversationData.createdUsername !== auth.username ? "/profile/" + conversationData.createdUsername : "/profile/" + conversationData.receivingUsername

        navigate(nav)
    }

    function closeCardHandlerSmallSearch(event) {
        if (event.target.className === "smallUsersSearchBackdrop" || event.target.className === "fa-solid fa-xmark smallSearchx") {
            setSmallSearchClick(false)
            setShowSearchContainer(false)
        }
    }

    return (
        <div className="messagesBodyContainer">
            {(smallSearchClick && !fetchingConversationUsers && !fetchingConversationUsers) && <SmallUsersSearch allConversationUsersArr={allConversationUsersArr} conversationUsersList={conversationUsersList} closeCardHandler={closeCardHandlerSmallSearch}/>}
            <div className="messagesBody">
                <div className="messagesBodyTitleContainer">
                    <p className="messagesBodyTitle">Messages</p>
                    <i className="fa-solid fa-xmark messageX2" onClick={homeHandler}></i>
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
                            <input className="searchUsersInput" placeholder="Find a user" onChange={(e) => setSearchInput(e.target.value)}></input>
                            {!fetchingConversationUsers ? currentlySearchingBool && <HomeSearchDropDown fetchedUsersArr={receivedConversationUsers} dmClass={true}/> : null}
                        </div>}
                        <div className={!showSearchContainer ? "conversationsListContainer" : "conversationsListContainer2"}>
                            {fetchingConversations && <LoadingSpinner height={"50%"} padding={"50px"}/>}
                            {!showUserBanner ? !fetchingConversations ?
                                listOfConversations.length ?
                                    listOfConversations.map((conversation, i) =>
                                    <ConversationCard conversationData={conversation} onJoinRoom={joinRoom} key={i}/>) : null : null : null}
                        </div>
                    </div>
                    <div className={!showUserBanner ? "mainMessagesContainerRight" : "mainMessagesContainerRight2"}>
                        {showUserBanner ? conversationData ? <div className="messageUserBanner">
                            <div className="messageUserBannerUser">
                                <img src={conversationData.createdUsername !== auth.username ? (process.env.REACT_APP_BACKEND_URL + conversationData.createdCreatorProfilePicture) : (process.env.REACT_APP_BACKEND_URL + conversationData.receivingCreatorProfilePicture)} className="messageUserBannerPic" />
                                <p onClick={fetchProfileHandler} className="messageUserBannerUsername">{conversationData.createdUsername !== auth.username ? "@" + conversationData.createdUsername : "@" + conversationData.receivingUsername}</p>
                            </div>
                            <i className="fa-solid fa-xmark messageX" onClick={closeConversationHandler}></i>
                        </div> : null : null}
                        <ScrollToBottom className="messageFeedContainer">
                            {conversationMessages.length ? conversationMessages.map((message, i) => <MessageCard message={message} key={i}/>) : null}
                        </ScrollToBottom>
                        {showUserBanner ? conversationData ? <div className="mainInputContainer">
                            <input className="messageInput" maxLength="64" ref={messageInput}></input>
                            <button className="sendMessageButton" onClick={sendMessageHandler}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div> : null : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesBody
