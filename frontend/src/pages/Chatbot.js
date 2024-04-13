import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Chatbot.css';
import LandingPage from "./LandingPage"
import SideBar from '../components/Sidebar';

function Chatbot() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/load-history/') //backend link, use for debugging
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <LandingPage> 
      {/* <SideBar/> */}
      <div className="text-3xl font-bold">
        <h1> Chatbot </h1>
      </div>
    </LandingPage>
  );
}

export default Chatbot; 