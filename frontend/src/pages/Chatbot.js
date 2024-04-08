import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './css/Chatbot.css';
import { Link } from 'react-router-dom';

function Chatbot() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/chatbot/') //backend link, use for debugging
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  const chatbotMessages = [
    "Hello how can i help?",
    "hi back at you"
  ];
  const userMessages = [
    "hello ",
    "thanks",
  ];

  return (
    <div className="d-flex">
      <div className="flex-shrink-0 p-3 shadow d-flex flex-column" style={{width: '280px', backgroundColor: '#e6e6e7', height: '100vh'}}>
        <ul className="mb-auto nav nav-pills flex-column">
          <li className="nav-item">
            <Link to="/" className="text-black nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/health-data" className="text-black nav-link">Health Data</Link>
          </li>
          <li className="nav-item">
            <Link to="/appointments" className="text-black nav-link">Appointments</Link>
          </li>
          <li className="nav-item">
            <Link to="/chatbot" className="text-black nav-link">Chatbot</Link>
          </li>
        </ul>
      </div>

      <div className="chat-interface" style={{flex: 1}}>
        <h1 className="text-3xl font-bold">Chatbot</h1>
        <div className="messages">
          {chatbotMessages.map((msg, index) => (
            <div key={index} style={{display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'}}>
              <p style={{maxWidth: '60%', margin: '5px', padding: '10px', borderRadius: '15px', backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ade8f4'}}>
                {index % 2 === 0 ? msg : userMessages[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
