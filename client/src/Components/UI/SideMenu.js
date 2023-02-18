import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router";

import './SideMenu.css'

import SettingsModal from "./SettingsModal";

function SideMenu(props) {
    const [allUsers, setAllUsers] = useState(props.allUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [receivedUsers, setReceivedUsers] = useState([])
    const [searchingBool, setSearchingBool] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        setSearchingBool(true)

        let returnArr = []

        allUsers.filter(user => {
            if (user.username.includes(searchTerm.toLowerCase())) {
                returnArr.push(user)
            }
        })

        setReceivedUsers(returnArr)

        if (!searchTerm) setSearchingBool(false)
    }, [searchTerm])

    function toProfileHandler(username) {
        navigate("/profile/" + username)
    }

    function toMessagesHandler() {
        navigate("/messages")
    }

    function closeMenuHandler() {
        props.onCloseMenu()
    }

    function settingsHandler() {
        setShowSettings(true)
    }

    function logoutHandler() {
        auth.logout()
    }

    function closeCardHandler(event) {
        if (event.target.className === "settingsModalBackdrop" || event.target.className === "fa-solid fa-xmark xmark") setShowSettings(false)
    }

    return (
        <div className="sideMenuContainer">
            {showSettings && <SettingsModal onCloseCard={closeCardHandler}/>}
            <div className="sideMenuMain">
                <div className="sideMenuHeaderContainer">
                    <p className="sideMenuHeader">Menu</p>
                    <i className="fa-solid fa-xmark menuxmark" onClick={closeMenuHandler}></i>
                </div>
                <div className="sideMenuBodyContainer">
                    <div className="sideMenuProfileBanner" onClick={() => toProfileHandler(auth.username)}>
                        <img className="sideMenuPic" src={"http://localhost:5000/" + auth.profilePicture}/>
                        <p className="sideMenuUsername">{"@" + auth.username}</p>
                    </div>
                    <div className="sideMenuOptionContainer" onClick={toMessagesHandler}>
                        <p className="sideMenuOptionText">Messages</p>
                        <i className="fa-solid fa-message sideMenuMessage"></i>
                    </div>
                    <div className="sideMenuOptionContainer" onClick={settingsHandler}>
                        <p className="sideMenuOptionText">Settings</p>
                        <i className="fa-solid fa-gear"></i>
                    </div>
                    <div className="sideMenuOptionContainer" onClick={logoutHandler}>
                        <p className="sideMenuOptionText">Log Out</p>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                    <div className="sideMenuOptionContainer2">
                        <input className="sideMenuSearchInput" placeholder="Find a user" onChange={(e) => setSearchTerm(e.target.value)}></input>
                        <div className="sideMenuUsersContainer">
                            {searchingBool ? receivedUsers.map((user, i) => (
                                <div key={user._id} className="sideMenuUserContainer" onClick={() => toProfileHandler(user.username)}>
                                    <img className="sideMenuPic2" src={"http://localhost:5000/" + user.profilePicture}/>
                                    <p className="sideMenuUsername2">{"@" + user.username}</p>
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu
