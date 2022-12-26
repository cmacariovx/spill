import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Profile from './Pages/Profile'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' exact element={<Landing />} />
        <Route path='/home' exact element={<Home />} />
        <Route path='/profile/:username' exact element={<Profile />} /> {/*path will be username*/}
      </Routes>
    </div>
  )
}

export default App
