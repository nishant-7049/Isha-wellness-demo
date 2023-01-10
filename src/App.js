import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/AdminPanel'
import { Route, Routes } from 'react-router-dom'

// pages to be defined: home, blogs, services, about

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path={'/'} element={<Home />} />
        <Route exact path={'/register'} element={<Register />} />
        <Route exact path={'/login'} element={<Login />} />
        <Route exact path={'/adminPanel'} element={<Admin />} />
        <Route path={'/*'} element={<div>404 PAGE NOT FOUND !</div>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
