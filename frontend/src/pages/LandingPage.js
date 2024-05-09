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

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBar />

        <div className="main-content">
          {children || <MainPage userData={userData}/>}
        </div>
      </div>
    </div>
  );
}

function MainPage({userData}) {
  return (
    <div style={{ 
        flexDirection: 'column', 
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2%',
        marginTop: '5%',
      }}>
      <div>  
          <h1> Welcome to CareFULL, {userData.firstName} {userData.lastName} </h1>
      </div>
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
            paddingLeft: '40px',
            fontFamily: 'Arial',
            fontSize: '20px',
          }}>
            <li style={{ marginBottom: '50px' }}>
              <Link to="/health-data" style={{ textDecoration: 'underline', color: 'blue'}}>
                📊 Access your Health Data Here
              </Link>
            </li>
            <li style={{ marginBottom: '50px' }}>
              <Link to="/appointments" style={{ textDecoration: 'underline', color: 'blue'}}>
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

        <div style={{ flex: 1, textAlign: 'right', paddingRight: '4.5%' }}>
          <img src={HealthImage} alt="Health Graphic" style={{ width: '80%', maxWidth: '500px' }} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;