import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/interviewPrep/InterviewPrep'
import LandingPage from './pages/interviewPrep/LandingPage'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
function App() {
  
  return (
    <>
    <Router>
      <Toaster 
      toastOptions={{
        className:'',
        style:{
          fontSize:'16px',
        }
      }}
      />
         

      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
