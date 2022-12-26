import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' exact element={<Landing />} />
        <Route path='/home' exact element={<Home />} />
        <Route path='/profile/:username' exact element={<Profile />} /> {/*path will be username*/}
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
