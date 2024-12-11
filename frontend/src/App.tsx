import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Regiser from './components/Regiser'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

const App = () => {
  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Regiser />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot" element={<ForgotPassword />} />
    <Route path="/reset/:token" element={<ResetPassword />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App