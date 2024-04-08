import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Chatbot from './pages/Chatbot';

// const FallbackRoute = () => {
//   let navigate = useNavigate();
  
//   useEffect(() => {
//     navigate('/');
//   }, [navigate]);

//   return null;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;