import React, { useState } from "react";
import { Link } from 'react-router-dom'

import './HomeSearchDropDownItem.css'

function HomeSearchDropDownItem(props) {
    const [ userData, setUserData ] = useState(props.userData)
    console.log(userData)

    function findUserProfileHandler() {
        props.onFindUserProfileHandler(userData.username)
    }
    return (
        <Link className="homeSearchDropDownItem" onClick={findUserProfileHandler} to={"/profile/" + userData.username}>
            <img src="#" className="dropDownImg"/>
            <div className="dropDownUsernameContainer">
                <p className="dropDownUsername">{"@" + userData.username}</p>
            </div>
        </Link>
    )
}

export default HomeSearchDropDownItem