import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../context/auth-context";

function AppPrivateRoutes() {
    const auth = useContext(AuthContext)

    return (
        auth.token ? <Outlet /> : <Navigate to="/"/>
    )
}

export default AppPrivateRoutes