import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './css/LandingPage.css';

function LandingPage({children}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/landing-page/') //backend link, use for debugging
      .then(response => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
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
        <Link to='/login' className='nav-link text-black' > Logout </Link>
      </div>
      </nav>

      <div style={{ display: 'flex' }}>
        {/* side navbar */}
        <div className="d-flex flex-column flex-shrink-0 p-3 shadow" style={{width: '280px', backgroundColor: '#e6e6e7', height: '100vh'}}>
          <ul className="nav nav-pills flex-column mb-auto custom-ul" style={{paddingTop: '100%'}}>
            <li className="nav-item">
              <Link to="/" className="nav-link text-black">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/health-data" className="nav-link text-black">
                Health Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/appointments" className="nav-link text-black">
                Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chatbot" className="nav-link text-black">
                Chatbot
              </Link>
            </li>
          </ul>
        </div>

        {/* main code under here */}
        <div> 
          {children ||
          <h1> Welcome to CareFULL, {firstName} {lastName} </h1>
          
          }
        </div>
      </div>
    </div>
  );
}

export default LandingPage;