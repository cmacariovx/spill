import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";

import './SmallUsersSearch.css'

import HomeSearchDropDown from "./HomeSearchDropDown";

function SmallUsersSearch(props) {
    const [searchInput, setSearchInput] = useState("")
    const [currentlySearchingBool, setCurrentlySearchingBool] = useState(false)
    const [allConversationUsersArr, setAllConversationUsersArr] = useState(props.allConversationUsersArr)
    const [conversationUsersList, setConversationUsersList] = useState(props.conversationUsersList)
    const [receivedConversationUsers, setReceivedConversationUsers] = useState([])

    const auth = useContext(AuthContext)

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

    function closeCardHandler(event) {
        props.closeCardHandler(event)
    }

    return (
        <div className="smallUsersSearchBackdrop" onClick={closeCardHandler}>
            <div className="smallUsersSearchContainer">
                <div className="smallUsersSearchHeaderContainer">
                    <p className="smallUsersSearchHeader">Search</p>
                    <i className="fa-solid fa-xmark smallSearchx"></i>
                </div>
                <div className="smallUsersSearchInputContainer">
                    <input className="smallUsersSearchInput" placeholder="Find a user" onChange={(e) => setSearchInput(e.target.value)}/>
                </div>
                <div className="smallUsersSearchFeedContainer">
                    {currentlySearchingBool ? allConversationUsersArr.length ? <HomeSearchDropDown fetchedUsersArr={receivedConversationUsers} dmClass={true}/> : null : null}
                </div>
            </div>
        </div>
    )
}

export default SmallUsersSearch
