import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/auth-context";

import './HomeSearchDropDownItem.css'

function HomeSearchDropDownItem(props) {
    const auth = useContext(AuthContext)

    const [ userData, setUserData ] = useState(props.userData)
    const [ dmClass, setDmClass ] = useState(props.dmClass)

    async function createNewConversationHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/message/createConversation", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId,
                createdUsername: auth.username,
                receivingUserId: userData._id,
                receivingUsername: userData.username,
                createdCreatorProfilePicture: auth.profilePicture,
                receivingCreatorProfilePicture: userData.profilePicture
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
        return data
    }

    return (
        <Link className="homeSearchDropDownItem" to={!dmClass ? "/profile/" + userData.username : ""} onClick={dmClass ?createNewConversationHandler : null}>
            <img src={"http://localhost:5000/" + userData.profilePicture} className="dropDownImg"/>
            <div className="dropDownUsernameContainer">
                <p className="dropDownUsername">{"@" + userData.username}</p>
                {userData.verified ? <i className="fa-solid fa-square-check searchMenuCheck"></i> : null}
            </div>
        </Link>
    )
}

export default HomeSearchDropDownItem
