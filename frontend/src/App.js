import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount'
import Chatbot from './pages/Chatbot';
import Appointments from './pages/Appointments';
import HealthData from './pages/HealthData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/> 
        <Route path="/appointments" element={<Appointments/>}/> 
        <Route path="/health-data" element={<HealthData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;