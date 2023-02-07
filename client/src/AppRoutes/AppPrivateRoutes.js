import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../context/auth-context";

function AppPrivateRoutes(props) {
    const auth = useContext(AuthContext)

    // prevents loading of auth token (false null read) from redirecting too early
    // -- if login is loading wait
    if (!props.isLoadingLogin) {
        return (
            auth.token ? <Outlet /> : <Navigate to="/"/>
            // fails first time before second render with auth token possibly rerouting away from profile page on first render
            // before the second one

            // doesnt fail until request is made
        )
    }
}

export default AppPrivateRoutes
