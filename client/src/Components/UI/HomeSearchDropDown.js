import React from "react";

import './HomeSearchDropDown.css'

import HomeSearchDropDownItem from "./HomeSearchDropDownItem";

function HomeSearchDropDown(props) {
    return (
        <div className="homeSearchDropDown">
            {console.log(props.fetchedUsersArr)}
            {/* {props.fetchedUsersArr.forEach((user, index) => {
                <HomeSearchDropDownItem usernameText={user.username}/>
            })} */}
        </div>
    )
}

export default HomeSearchDropDown