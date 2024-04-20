import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './css/LandingPage.css';
import SideBar from '../components/Sidebar';

function LandingPage({children}) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-user-info/') //backend link, use for debugging
      .then(response => {
        setUserData({...userData, 
        'firstName': response.data.first_name, 
        'lastName': response.data.last_name,
        'email': response.data.email});
      })
      .catch(error => {
        const msg = error.response.data.error;
        if (msg === 'not logged in' ? navigate('/login') : console.log(error));
      });
  }, [userData, navigate]);

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
      {/* top navbar */}
      <nav className="shadow-sm navbar navbar-light" style={{ backgroundColor: '#e6e6e7'}}>
      <div className="container-fluid">
        {/* add logo */}
        <span className="navbar-brand" style={{color: '#154c79', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}> CareFULL </span>
        <Link to='/login' className='text-black nav-link' onClick={logout}> Logout </Link>
      </div>
      </nav>

      <div style={{ display: 'flex' }}>
        {/* side navbar */}
        <SideBar />

        {/* main code under here */}
        <div> 
          {children ||
          <h1> Welcome to CareFULL, {userData.firstName} {userData.lastName} </h1>
          
          }
        </div>
      </div>
    </div>
  );
}

export default LandingPage;