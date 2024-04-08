<<<<<<< Updated upstream
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
  const [message, setMessage] = useState('');

  {/* we can go to this link to see debugging info for backend */}
  useEffect(() => {
    axios.get('http://localhost:8000/api/landing-page/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="text-3xl font-bold">
      <h1> Welcome to CareFULL </h1>
      <p> {message} </p> {/* this message is taken from backend */}
=======
function LandingPage() {
  return (
    <div className="text-3xl font-bold underline">
      Hello world!
>>>>>>> 2270c9a55b5c6844476c317111dd335b00c1dfa6
    </div>
  );
}

export default LandingPage;
=======
// Chatbot.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Chatbot.css';
import { Link } from 'react-router-dom';

function Chatbot() {

  // function LandingPage() {
  //   const [message, setMessage] = useState('');
  //   const [data, setData] = useState([]);
  
  //   useEffect(() => {
  //     axios.get('http://localhost:8000/api/landing-page/') //backend link, use for debugging
  //       .then(response => {
  //         //setMessage(response.data.message);
  //         setData(response.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, []);
  const chatbotMessages = [
    "Welcome to CareFULL Health Helper. How can we assist you today?",
    "Can you provide more details?",
    "Thank you! We're processing your request."
  ];
  const userMessages = [
    "I have a question about my appointment.",
    "It's about the timing.",
    "That's all, thanks!"
  ];

  return (
    <div className="d-flex">
      {/* Side Navbar */}
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


{/* old code
      <h1> Welcome to CareFULL </h1>
      <p> messages from db: </p>
      <ul> {data.map(item =>
        <li key={item.id}> {item.name} </li>
      )} </ul> {/* this message is taken from backend
      */}
>>>>>>> Stashed changes
