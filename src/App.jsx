import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Downloadpage from './pages/Downloadpage'
import Dashboard from './pages/admin/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Comemntlist from './pages/admin/Commentlist'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Downloadpage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/comments-list" element={<Comemntlist/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
