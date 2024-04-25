import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LandingPage.css';
import SideBar from '../components/Sidebar';
import Modal from '../components/Modal.js';

function LandingPage({ children }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isWeightModalOpen, setWeightModalOpen] = useState(false);
  const [isStepsModalOpen, setStepsModalOpen] = useState(false);
  const [isHeartModalOpen, setHeartModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/get-user-info/') //backend link, use for debugging
      .then((response) => {
        setUserData({
          ...userData,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
        });
      })
      .catch((error) => {
        const msg = error.response.data.error;
        if (msg === 'not logged in') navigate('/login');
        else console.log(error);
      });
  }, []);

  const logout = (e) => {
    axios
      .post('http://localhost:8000/api/logout/')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const openModal = (modal) => {
    if (modal === 'weight') setWeightModalOpen(true);
    if (modal === 'steps') setStepsModalOpen(true);
    if (modal === 'heart') setHeartModalOpen(true);
  };

  const closeModal = (modal) => {
    if (modal === 'weight') setWeightModalOpen(false);
    if (modal === 'steps') setStepsModalOpen(false);
    if (modal === 'heart') setHeartModalOpen(false);
  };

  const healthData = {
    weightChange: '-2.4lbs',
    stepsThisWeek: '24,670 steps',
    avgHeartRateThisWeek: '72 bpm',
    heartRateData: [
      { month: 'Jan', rate: 75 },
      { month: 'Feb', rate: 78 },
      { month: 'Mar', rate: 80 },
      { month: 'Apr', rate: 72 },
      { month: 'May', rate: 70 },
    ],
    timeSpentData: {
      sleep: 8,
      indoor: 10,
      outdoor: 6,
    },
  };

  return (
    <div>
      {/* top navbar */}
      <nav className="shadow-sm navbar navbar-light" style={{ backgroundColor: '#e6e6e7' }}>
        <div className="container-fluid">
          <span
            className="navbar-brand"
            style={{
              color: '#154c79',
              fontFamily: 'Nunito Sans, sans-serif',
              fontWeight: 'bold',
            }}
          >
            CareFULL
          </span>
          <Link to="/login" className="text-black nav-link" onClick={logout}>
            Logout
          </Link>
        </div>
      </nav>
      <div style={{ display: 'flex' }}>
        {/* side navbar */}
        <SideBar />
        {/* main code under here */}
        <div className="main-content">
          {children || (
            <>
              <h1>
                Welcome to CareFULL, {userData.firstName} {userData.lastName}
              </h1>
              <div className="health-data-container">
                <div className="health-data-header">
                  <h2>Your Day at a Glance, John</h2>
                  <div className="data-buttons">
                    <button onClick={() => openModal('weight')}>Weight Data</button>
                    <button onClick={() => openModal('steps')}>Steps Data</button>
                    <button onClick={() => openModal('heart')}>Heart Data</button>
                    <button>Other Data</button>
                  </div>
                </div>
                <div className="health-data-summary">
                  <div>
                    <p>Weight Change</p>
                    <p>{healthData.weightChange}</p>
                    <p>Total Change This Week</p>
                  </div>
                  <div>
                    <p>Steps</p>
                    <p>{healthData.stepsThisWeek}</p>
                    <p>This Week</p>
                  </div>
                  <div>
                    <p>Heart Rate</p>
                    <p>{healthData.avgHeartRateThisWeek}</p>
                    <p>Avg This Week</p>
                  </div>
                </div>
                <div className="health-data-charts">
                  <div className="heart-health-chart">
                    <h3>Heart Health</h3>
                    <div className="chart-container">
                      {/* Render heart rate chart */}
                      <div className="heart-rate-chart">
                        {healthData.heartRateData.map((data) => (
                          <div key={data.month} className="chart-bar" style={{ height: `${data.rate}px` }}>
                            <span>{data.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="time-spent-chart">
                    <h3>Time Spent</h3>
                    <div className="chart-container">
                      {/* Render time spent chart */}
                      <div className="time-spent-chart-inner">
                        <div
                          className="sleep-bar"
                          style={{ width: `${(healthData.timeSpentData.sleep / 24) * 100}%` }}
                        ></div>
                        <div
                          className="indoor-bar"
                          style={{ width: `${(healthData.timeSpentData.indoor / 24) * 100}%` }}
                        ></div>
                        <div
                          className="outdoor-bar"
                          style={{ width: `${(healthData.timeSpentData.outdoor / 24) * 100}%` }}
                        ></div>
                      </div>
                      <div className="chart-labels">
                        <span>Sleep</span>
                        <span>Indoor</span>
                        <span>Outdoor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isWeightModalOpen && (
        <Modal onClose={() => closeModal('weight')}>
          <h2>Add Weight</h2>
          <input type="date" />
          <input type="number" placeholder="Enter weight" />
          <button>Save</button>
        </Modal>
      )}

      {isStepsModalOpen && (
        <Modal onClose={() => closeModal('steps')}>
          <h2>Add Steps</h2>
          <input type="date" />
          <input type="number" placeholder="Enter steps" />
          <button>Save</button>
        </Modal>
      )}

      {isHeartModalOpen && (
        <Modal onClose={() => closeModal('heart')}>
          <h2>Add Heart Rate</h2>
          <input type="date" />
          <input type="number" placeholder="Enter heart rate" />
          <button>Save</button>
        </Modal>
      )}
    </div>
  );
}

export default LandingPage;