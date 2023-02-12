import React, { useState } from "react";

import './HomeSearchDropDown.css'

import HomeSearchDropDownItem from "./HomeSearchDropDownItem";

function HomeSearchDropDown(props) {
    const [dmClass, setDmClass] = useState(props.dmClass)
    return (
        <div className={!dmClass ? "homeSearchDropDown1" : "homeSearchDropDown2"}>
            {props.fetchedUsersArr.map((user, index) => (
                <HomeSearchDropDownItem key={user._id} userData={user} dmClass={dmClass}/>
            ))}
        </div>
    )
}

export default HomeSearchDropDown
