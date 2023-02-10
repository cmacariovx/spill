import React from "react";

import './HomeSearchDropDown.css'

import HomeSearchDropDownItem from "./HomeSearchDropDownItem";

function HomeSearchDropDown(props) {
    return (
        <div className="homeSearchDropDown">
            {props.fetchedUsersArr.map((user, index) => (
                <HomeSearchDropDownItem key={user._id} userData={user}/>
            ))}
        </div>
    )
}

export default HomeSearchDropDown
