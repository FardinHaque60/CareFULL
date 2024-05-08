import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './css/LandingPage.css';
import SideBar from '../components/Sidebar';
import HealthImage from '../medicalImage.webp';

function LandingPage({children}) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-user-info/') //backend link, use for debugging
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        const msg = error.response.data.error;
        if (msg === 'not logged in' ? navigate('/login') : console.log(error));
      });
  }, []);

  const logout = (e) => {
    axios.post('http://localhost:8000/api/logout/')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  return (
    <div>
      {/* top navbar
      <nav className="shadow-sm navbar navbar-light" style={{ backgroundColor: '#e6e6e7'}}>
      <div className="container-fluid">
        <span className="navbar-brand" style={{color: '#154c79', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}> CareFULL </span>
        <Link to='/login' className='text-black nav-link' onClick={logout}> Logout </Link>
      </div>
      </nav>
      */}

      <div style={{ display: 'flex' }}>
        <SideBar />

        <div className="main-content" style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          {children || <MainPage/>}
        </div>
      </div>
    </div>
  );
}

function MainPage() {
  return (
    <div className="main-content" style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <ul style={{
          listStyleType: 'disc',
          paddingLeft: '20px',
          fontFamily: 'Arial',
          fontSize: '16px'
        }}>
          <li>
            <Link to="/health-data" style={{ textDecoration: 'underline', color: 'blue' }}>
              📊 Access your Health Data Here
            </Link>
          </li>
          <li>
            <Link to="/appointments" style={{ textDecoration: 'underline', color: 'blue' }}>
              🗓️ Create or View your Appointments Here
            </Link>
          </li>
          <li>
            <Link to="/chatbot" style={{ textDecoration: 'underline', color: 'blue' }}>
              🤖 Find or Chat with AI for Directed Health Support Here
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ flex: 1, textAlign: 'right' }}>
        <img src={HealthImage} alt="Health Graphic" style={{ width: '80%', maxWidth: '500px' }} />
      </div>
    </div>
  );
}

export default LandingPage;