import React from "react";

import HomeMainBody from "../Components/UI/HomeMainBody";

import './Home.css'

function Home(props) {
    // function homeTopFindUserProfileHandler(username) {
    //     props.onAppFindUserProfileHandler(username)
    // }
    // onHomeFindUserProfileHandler={homeTopFindUserProfileHandler}
    return (
        <div className="homeContainer">
            <HomeMainBody />
        </div>
    )
}

export default Home
