import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

import FollowerCard from "./FollowerCard";

import './FollowersModal.css'

function FollowersModal(props) {
    const [followersMode, setFollowersMode] = useState(props.followersMode)
    const [followersData, setFollowersData] = useState(props.followersMode ? props.profileData.followers : props.profileData.following)

    const auth = useContext(AuthContext)

    function closeCard(event) {
        props.onCloseCard(event)
    }

    return (
        <div className="followersModalBackdrop" onClick={closeCard}>
            <div className="followersModalContainer">
                <div className="followersModalTitleContainer">
                    <p className="followersModalTitle">{followersMode ? "Followers" : "Following"}</p>
                    <i class="fa-solid fa-xmark followersxmark"></i>
                </div>
                <div className="followersModalBodyContainer">
                    {followersData.map((user, i) => <FollowerCard key={i} userData={user} followersMode={followersMode}/>)}
                </div>
            </div>
        </div>
    )
}

export default FollowersModal
