import React from 'react'
import EcomNav from './pages/EcomNav'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Store from './pages/Store'
import NoMatch from './pages/NoMatch'
import RestrictedRoute from './components/RestrictedRoute'

function App() {
  return (
    <>
    <EcomNav/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/Dashboard' element={<RestrictedRoute><Dashboard/></RestrictedRoute>}/>
      <Route path='/store' element={<RestrictedRoute><Store/></RestrictedRoute>}/>
      <Route path='*' element={<NoMatch/>}/>
    </Routes>
    </>
  )
}

export default App