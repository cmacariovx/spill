import React, { useState, useRef, useEffect } from "react";

import './ImageUpload.css'

function ImageUpload(props) {
    const [image, setImage] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const imageRef = useRef()

    useEffect(() => {
        if (!image) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(image)
    }, [image])

    function chooseImageHandler() {
        imageRef.current.click()
    }

    function imageUploadClick(event) {
        let pickedImage
        let imageIsValid

        if (event.target.files && event.target.files.length === 1) {
            pickedImage = event.target.files[0]
            setImage(pickedImage)
            setIsValid(true)
            imageIsValid = true
        }
        else {
            setIsValid(false)
            imageIsValid = false
        }

        props.onValid(imageIsValid, pickedImage)
    }

    return (
        <div className="imageUploadContainer">
            <input className="imageUploadInput" ref={imageRef} type="file" onChange={imageUploadClick} accept=".jpg,.png,.jpeg"></input>
            <div className="imageUploadMainContainer">
                {previewUrl && <div className="imageUploadPreview">
                    <img src={previewUrl} alt="" className="imagePreview"/>
                </div>}
                <button className="imageUploadButton" onClick={chooseImageHandler}>Choose Image</button>
            </div>
        </div>
    )
}

export default ImageUpload
