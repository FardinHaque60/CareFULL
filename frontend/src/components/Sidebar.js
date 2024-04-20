import React from 'react';
import {Link} from 'react-router-dom';

function SideBar() {
  
  return (
    <div className="flex-shrink-0 p-3 shadow d-flex flex-column" style={{width: '280px', backgroundColor: '#e6e6e7', height: '100vh'}}>
        <ul className="mb-auto nav nav-pills flex-column custom-ul" style={{paddingTop: '100%'}}>
        <li className="nav-item">
            <Link to="/" className="text-black nav-link">
            Home
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/health-data" className="text-black nav-link">
            Health Data
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/appointments" className="text-black nav-link">
            Appointments
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/chatbot" className="text-black nav-link">
            Chatbot
            </Link>
        </li>
        </ul>
    </div>
  );
}

export default SideBar; 