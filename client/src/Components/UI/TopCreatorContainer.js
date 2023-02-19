import React, { useState } from "react";
import { Link } from "react-router-dom";

import './TopCreatorContainer.css'

import personalPic from './Images/personal.jpg'

function TopCreatorContainer(props) {
    let [currentUser, setCurrentUser] = useState(props.currentUser)

    return (
        <Link className="topCreatorContainer" to={"/profile/" + currentUser.username}>
            <div className="topCreatorPositionContainer">
                <p className="topCreatorPositionText">{"#" + props.currentIndex + " Creator"}</p>
            </div>
            <div className="topCreatorUserContainer">
                <img className="topCreatorPic" src={process.env.REACT_APP_BACKEND_URL + currentUser.profilePicture} alt=""/>
                <p className="topCreatorUserText">{"@" + currentUser.username}</p>
                {currentUser.verified ? <i className="fa-solid fa-square-check topCreatorCheck"></i> : null}
            </div>
        </Link>
    )
}

export default TopCreatorContainer
