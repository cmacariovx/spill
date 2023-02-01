import React, { useState, useCallback, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'

import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Components/Login'
import Signup from './Components/Signup'
import AppPrivateRoutes from './AppRoutes/AppPrivateRoutes'
import AppPublicRoutes from'./AppRoutes/AppPublicRoutes'

import { AuthContext } from './context/auth-context'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [usernameAuth, setUsernameAuth] = useState(null)
  const [loadingLogin, setLoadingLogin] = useState(true)

  // const [profileUsername, setProfileUsername] = useState(null)

  const login = useCallback((uid, token, username) => {
    setToken(token)
    setUserId(uid)
    setUsernameAuth(username)
    // updates state on every rerender/refresh if login is called and causes component to render for 2nd time
    // setToken and setUserId fully reruns component and calls AppPrivateRoutes again with actual token

    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, username: username}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUsernameAuth(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.username)
    }
    setLoadingLogin(false)
  }, [login]) // will run everytime and call login which will set token and userId state if userData is in localstorage

  // function appUserProfileHandler(username) {
  //   setProfileUsername(username)
  // }
  // usernameProfile={profileUsername}
  // onAppFindUserProfileHandler={appUserProfileHandler}

  // -------------- this renders before useEffect

  return ( // everything rerenders with actual token on second render
    <div className="app">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          username: usernameAuth,
          login: login,
          logout: logout
        }}
      >
        <Routes>
          <Route element={<AppPublicRoutes isLoadingLogin={loadingLogin}/>}>
            <Route path='/' exact element={<Landing />} />
            <Route path='/auth/login' exact element={<Login />} />
            <Route path='/auth/signup' exact element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Route>

          <Route element={<AppPrivateRoutes isLoadingLogin={loadingLogin}/>}>
            <Route path='/home' exact element={<Home/>} />
            <Route path='/profile/:username' element={<Profile/>} />
            <Route path="*" element={<Navigate to="/home" replace />}/>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App
