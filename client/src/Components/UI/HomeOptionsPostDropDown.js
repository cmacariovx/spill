import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

import './HomeOptionsPostDropDown.css'

function HomeOptionsPostDropDown(props) {
    const auth = useContext(AuthContext)

    let [postData, setPostData] = useState(props.postData)
    console.log(postData)

    async function deletePostHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/home/deletePost", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId,
                postId: props.postData._id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = response.json()
        console.log(data)
        window.location.reload()
        return data
    }

    return (
        <div className="homeOptionsPostDropDownContainer">
            <div className="deletePostContainer" onClick={deletePostHandler}>
                <p className="deletePostText">Delete Post</p>
            </div>
        </div>
    )
}

export default HomeOptionsPostDropDown
