import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../context/auth-context";

function AppPrivateRoutes() {
    const auth = useContext(AuthContext)

    return (
        auth.token ? <Outlet /> : <Navigate to="/"/> // doesnt fail until request is made
    )
}

// console.log("Auth Token Failed: " + auth.token)

export default AppPrivateRoutes