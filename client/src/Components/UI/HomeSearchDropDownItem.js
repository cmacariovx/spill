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
                receivingUsername: userData.username
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
        <Link className="homeSearchDropDownItem" to={!dmClass ? "/profile/" + userData.username : ""} onClick={createNewConversationHandler}>
            <img src="#" className="dropDownImg"/>
            <div className="dropDownUsernameContainer">
                <p className="dropDownUsername">{"@" + userData.username}</p>
            </div>
        </Link>
    )
}

export default HomeSearchDropDownItem
