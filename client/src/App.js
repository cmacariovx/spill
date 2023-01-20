import React, { useState, useCallback, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'

import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Components/Login'
import Signup from './Components/Signup'

import { AuthContext } from './context/auth-context'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

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

  let routes

  if (token) {
    routes = (
      <Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/profile/:username' exact element={<Profile />} />
        <Route
        path="*"
        element={<Navigate to="/home" replace />}
        />
      </Routes>
    )
  }
  else {
    routes = (
      <Routes>
        <Route path='/' exact element={<Landing />} />
        <Route path='/auth/login' exact element={<Login />} />
        <Route path='/auth/signup' exact element={<Signup />} />
        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
      </Routes>
    )
  }

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
        {routes}
      </AuthContext.Provider>
    </div>
  )
}

export default App
