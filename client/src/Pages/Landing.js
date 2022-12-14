import React from "react";

import './Landing.css'

import LandingHeader from "../Components/UI/LandingHeader"
import LandingBody from "../Components/UI/LandingBody"
import LandingFooter from "../Components/UI/LandingFooter"

function Landing() {
    return (
        <div className="landingContainer">
            <LandingHeader />
            <LandingBody />
            <LandingFooter />
        </div>
    )
}

export default Landing
