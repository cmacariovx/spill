import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './FollowerCard.css'

function FollowerCard(props) {
    const [followersMode, setFollowersMode] = useState(props.followersMode)
    const [userData, setUserData] = useState(props.userData)

    const navigate = useNavigate()

    function toProfileHandler() {
        navigate(followersMode ? "/profile/" + userData.loggedInUsername : "/profile/" + userData.followedUsername)
        window.location.reload()
    }

    return (
        <div className="followerCardContainer" onClick={toProfileHandler}>
            <img src={followersMode ? (process.env.REACT_APP_BACKEND_URL + userData.loggedInUserProfilePicture) : (process.env.REACT_APP_BACKEND_URL + userData.followedUserProfilePicture)} className="followerCardImg"/>
            <div className="followerCardUsernameContainer">
                <p className="followerCardUsername">{followersMode ? "@" + userData.loggedInUsername : userData.followedUsername}</p>
                {followersMode ? userData.loggedInUserverified : userData.followedUserVerified ? <i className="fa-solid fa-square-check followerCardCheck"></i> : null}
            </div>
        </div>
    )
}

export default FollowerCard
