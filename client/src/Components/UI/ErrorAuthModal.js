import React, { useState } from "react";

import './ErrorAuthModal.css'

function ErrorAuthModal(props) {
    let [errorsArr, setErrorsArr] = useState(props.errors)

    function closeErrorHandler(event) {
        if (event.target.className === "errorBackdrop" || event.target.className === "fa-solid fa-xmark closex") {
            props.onCloseError()
        }
    }

    return (
        <div className="errorBackdrop" onClick={closeErrorHandler}>
            <div className="errorAuthModalContainer">
                <div className="errorTitleContainer">
                    <p className="errorTitle">Error</p>
                    <i className="fa-solid fa-xmark closex"></i>
                </div>
                <div className="errorMainContainer">
                    {errorsArr.map((error, i) => (
                        <p className="errorText" key={i}>{"- " + error}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ErrorAuthModal
