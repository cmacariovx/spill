import React, { useContext, useState, useEffect } from "react";

import './SettingsModal.css'

import { AuthContext } from "../../context/auth-context";

function SettingsModal(props) {
    const auth = useContext(AuthContext)

    let [likedPostsPrivate, setLikedPostsPrivate] = useState(null)

    async function keepLikedPostsPrivateHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/profile/likedPostsPrivate", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        setLikedPostsPrivate(true)
        return data
    }

    async function keepLikedPostsPublicHandler(event) {
        event.preventDefault()

        const response = await fetch("http://localhost:5000/profile/likedPostsPublic", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        setLikedPostsPrivate(false)
        return data
    }

    // fetches entire user object
    async function fetchSettings() {
        const response = await fetch("http://localhost:5000/profile/fetchSettings", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    async function getFetchedSettings(cb) {
        const fetchedSettings = await cb()
        setLikedPostsPrivate(fetchedSettings.privateLikedPosts)
    }

    useEffect(() => {
        getFetchedSettings(fetchSettings)
    }, [])

    return (
        <div className="settingsModalBackdrop" onClick={props.onCloseCard}>
            <div className="settingsModalContainer">
                <div className="settingsTitleContainer">
                    <p className="settingsTitle">Settings</p>
                    <i className="fa-solid fa-xmark xmark"></i>
                </div>
                <div className="settingsMainContainer">
                    <div className="settingsBox">
                        <p className="settingsText">Keep Liked Videos Private</p>
                        <div className={!likedPostsPrivate ? "sliderContainer1" : "sliderContainer2"} onClick={!likedPostsPrivate ? keepLikedPostsPrivateHandler : keepLikedPostsPublicHandler}>
                            <div className={!likedPostsPrivate ? "sliderBall1" : "sliderBall2"}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal
