import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/HealthData.css';
import Modal from '../components/Modal.js';
import LandingPage from './LandingPage.js';

function HealthData() {
  const [userData, setUserData] = useState({});
  const [isWeightModalOpen, setWeightModalOpen] = useState(false);
  const [isStepsModalOpen, setStepsModalOpen] = useState(false);
  const [isHeartModalOpen, setHeartModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-user-info/') //backend link, use for debugging
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        const msg = error.response.data.error;
        if (msg === 'not logged in') navigate('/login');
        else console.log(error);
      });
  }, []);

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
    <LandingPage>
      <div className="health-data-container">
        <div className="health-data-header">
          <h2>Your Day at a Glance, {userData.firstName} {userData.lastName}</h2>
          <div className="data-buttons">
            <button className="btn btn-primary" onClick={() => openModal('weight')}>+ Weight Data</button>
            <button className="btn btn-primary" onClick={() => openModal('steps')}>+ Steps Data</button>
            <button className="btn btn-primary" onClick={() => openModal('heart')}>+ Heart Data</button>
            <button className="btn btn-primary" >+ Other Data</button>
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
    </LandingPage>
  );
}

export default HealthData;