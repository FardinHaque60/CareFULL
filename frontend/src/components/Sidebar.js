import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./css/SideBar.css";

function SideBar() {
    const location = useLocation();

    const logout = (e) => {
        axios.post('http://localhost:8000/api/logout/')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }

    return (
        <div className="flex-shrink-0 p-3 shadow d-flex flex-column" style={{ width: '280px', backgroundColor: '#e6e6e7', height: '100vh' }}>
            <span className="navbar-brand" style={{ color: '#9c2a2a', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '20px' }}> 🧬 CareFULL </span>
            <ul className="mb-auto nav flex-column custom-ul" style={{ paddingTop: '100%' }}>
                <li className="">
                    <Link to="/" className={`text-black nav-link mb-3 ${location.pathname === '/' ? 'active' : ''}`}>
                        🏠 Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/health-data" className={`text-black nav-link mb-3 ${location.pathname === '/health-data' ? 'active' : ''}`}>
                        📊 Health Data
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/appointments" className={`text-black nav-link mb-3 ${location.pathname === '/appointments' ? 'active' : ''}`}>
                        🗓️ Appointments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/chatbot" className={`text-black nav-link mb-3 ${location.pathname === '/chatbot' ? 'active' : ''}`}>
                        💬 Chatbot
                    </Link>
                </li>
            </ul>
            <Link to='/login' className='text-black nav-link' onClick={logout}> Logout →</Link>
        </div>
    );
}

export default SideBar;