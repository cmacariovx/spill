import React from "react";

import './HomeSearchDropDown.css'

import HomeSearchDropDownItem from "./HomeSearchDropDownItem";

function HomeSearchDropDown(props) {
    return (
        <div className="homeSearchDropDown">
            {props.fetchedUsersArr.map((user, index) => {
                console.log(user)
                // <HomeSearchDropDownItem/>
            })}
        </div>
    )
}

export default HomeSearchDropDown