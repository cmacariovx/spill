import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    username: null,
    following: [],
    login: () => {},
    logout: () => {},
    followUpdate: () => {},
    unfollowUpdate: () => {}
})
