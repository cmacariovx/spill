import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/auth-context";

import './HomeOptionsPostDropDown.css'

function HomeOptionsPostDropDown(props) {
    const auth = useContext(AuthContext)

    let [postData, setPostData] = useState(props.postData)

    async function deletePostHandler(event) {
        event.preventDefault()

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "home/deletePost", {
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
        window.location.reload()
        return data
    }

    function closePostOptionsHandler() {
        props.setShowPostOptionsHandler(false)
    }

    // runs on render once
    function useOutsideAlerter(ref) {

        // runs once per dropdown open due to ref not changing outside of useEffect during clicks, only changes on opening of dropdown component
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                // if div exists and the click isnt any of the div elements or the div itself (outside click), close div
                if (ref.current && !ref.current.contains(event.target)) {
                    closePostOptionsHandler()
                }
            }

            // Bind the event listener, persists click after click
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                // Unbind the event listener on clean up (when main div is left)
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        // sets --wrapper-- ref to main container so it can listen to changes all within main container,
        // then it's used in the function to listen for clicks outside of container

        // assigns wrapper ref as the main listening ref, then we pass that into the outside click listening function
        <div ref={wrapperRef} className="homeOptionsPostDropDownContainer">
            <div className="exitPostOptionsContainer">
                <i className="fa-solid fa-xmark small-x" onClick={closePostOptionsHandler}></i>
            </div>
            <div className="deletePostContainer" onClick={deletePostHandler}>
                <p className="deletePostText">Delete Post</p>
            </div>
        </div>
    )
}

export default HomeOptionsPostDropDown
