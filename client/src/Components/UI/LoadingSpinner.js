import React, { useState } from "react";

import './LoadingSpinner.css'

function LoadingSpinner(props) {
    const [height, setHeight] = useState(props.height)
    const [padding, setPadding] = useState(props.padding)

    return (
        <div className="spinnerContainer" style={{height: height, paddingRight: padding}}>
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingSpinner
