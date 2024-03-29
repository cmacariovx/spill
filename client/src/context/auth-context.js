import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    username: null,
    following: [],
    verified: null,
    profilePicture: null,
    login: () => {},
    logout: () => {},
    followUpdate: () => {},
    unfollowUpdate: () => {}
})
