import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/LandingPage.css';

function LandingPage() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/landing-page/') //backend link, use for debugging
      .then(response => {
        //setMessage(response.data.message);
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* top navbar */}
      <nav className="navbar navbar-light shadow-sm" style={{ backgroundColor: '#e6e6e7'}}>
      <div className="container-fluid">
        {/* add logo */}
        <span className="navbar-brand" style={{color: '#154c79', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}> CareFULL </span>
      </div>
      </nav>

      {/* side navbar */}
      <div className="d-flex flex-column flex-shrink-0 p-3 shadow" style={{width: '280px', backgroundColor: '#e6e6e7', height: '100vh'}}>
        <ul className="nav nav-pills flex-column mb-auto custom-ul" style={{paddingTop: '100%'}}>
          <li className="nav-item">
            <a href="#" className="nav-link text-black">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black">
              Health Data
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black">
              Appointments
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black">
              Chatbot
            </a>
          </li>
        </ul>
      </div>

      {/* old code
      <h1> Welcome to CareFULL </h1>

      <p> messages from db: </p>
      <ul> {data.map(item =>
        <li key={item.id}> {item.name} </li>
      )} </ul> {/* this message is taken from backend
      */}
    </div>
  );
}

export default LandingPage;

{/* old code
      <h1> Welcome to CareFULL </h1>
      <p> messages from db: </p>
      <ul> {data.map(item =>
        <li key={item.id}> {item.name} </li>
      )} </ul> {/* this message is taken from backend
      */}
