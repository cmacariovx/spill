import React from "react";
import { Link } from 'react-router-dom'

import './LandingHeader.css'

function LandingHeader() {
    return (
        <div className="landingHeaderContainer">
            <div className="landingLogoContainer">
                <p className="landingLogoText">Spill</p>
            </div>
            <div className="landingNavContainer">
                <ul className="landingNav">
                    <Link className="landingNavText" to="/auth/login">Log In</Link>
                    <Link className="landingNavText" to="/auth/signup">Sign Up</Link>
                </ul>
            </div>
        </div>
    )
}

export default LandingHeader
