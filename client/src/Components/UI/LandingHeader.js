import React from "react";

import './LandingHeader.css'

function LandingHeader() {
    return (
        <div className="landingHeaderContainer">
            <div className="landingLogoContainer">
                <p className="landingLogoText">Socia</p>
            </div>
            <div className="landingNavContainer">
                <ul className="landingNav">
                    <li className="landingNavText">Log In</li>
                    <li className="landingNavText">Sign Up</li>
                </ul>
            </div>
        </div>
    )
}

export default LandingHeader
