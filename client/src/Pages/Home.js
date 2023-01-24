import React from "react";

import HomeMainBody from "../Components/UI/HomeMainBody";

import './Home.css'

function Home(props) {
    function homeTopFindUserProfileHandler(username) {
        props.onAppFindUserProfileHandler(username)
    }
    return (
        <div className="homeContainer">
            <HomeMainBody onHomeFindUserProfileHandler={homeTopFindUserProfileHandler}/>
        </div>
    )
}

export default Home
