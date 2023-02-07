import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import App from './App'
import RC4 from './RC4'


const UserRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rc4" element={<RC4 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default UserRoutes