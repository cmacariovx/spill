import React, { useState } from "react";

import './HomeSearchDropDownItem.css'

function HomeSearchDropDownItem(props) {
    const [ userData, setUserData ] = useState(props.userData)
    console.log(userData)
    return (
        <div className="homeSearchDropDownItem">
            <img src="#" className="dropDownImg"/>
            <div className="dropDownUsernameContainer">
                <p className="dropDownUsername">{"@" + userData.username}</p>
            </div>
        </div>
    )
}

export default HomeSearchDropDownItem