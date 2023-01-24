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
  const [profileUsername, setProfileUsername] = useState(null)

  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

  function appUserProfileHandler(username) {
    setProfileUsername(username)
  } 

  // let routes

  // if (token) {
  //   routes = (
  //     <Routes>
  //       <Route path='/home' exact element={<Home onAppFindUserProfileHandler={appUserProfileHandler}/>} />
  //       <Route path='/profile/:username' exact element={<Profile usernameProfile={profileUsername}/>} />
  //       {/* <Route
  //       path="*"
  //       element={<Navigate to="/home" replace />}
  //       /> */}
  //     </Routes>
  //   )
  // }
  // else {
  //   routes = (
  //     <Routes>
  //       <Route path='/' exact element={<Landing />} />
  //       <Route path='/auth/login' exact element={<Login />} />
  //       <Route path='/auth/signup' exact element={<Signup />} />
  //       {/* <Route
  //       path="*"
  //       element={<Navigate to="/" replace />}
  //       /> */}
  //     </Routes>
  //   )
  // }

  return (
    <div className="app">
      <AuthContext.Provider 
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <Routes>
          <Route element={<AppPublicRoutes />}>
            <Route path='/' exact element={<Landing />} />
            <Route path='/auth/login' exact element={<Login />} />
            <Route path='/auth/signup' exact element={<Signup />} />
            <Route
            path="*"
            element={<Navigate to="/" replace />}
            />
          </Route>

          <Route element={<AppPrivateRoutes />}>
            <Route path='/home' exact element={<Home onAppFindUserProfileHandler={appUserProfileHandler}/>} />
            <Route path='/profile/:username' exact element={<Profile usernameProfile={profileUsername}/>} />
            <Route
            path="*"
            element={<Navigate to="/home" replace />}
            />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App
