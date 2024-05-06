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
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
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
      fetchHealthData();
      
  }, []);

  const openModal = (modal) => {
    if (modal === 'weight') setWeightModalOpen(true);
    if (modal === 'steps') setStepsModalOpen(true);
    if (modal === 'heart') setHeartModalOpen(true);
    if (modal === 'time') setTimeModalOpen(true);
  };

  const closeModal = (modal) => {
    if (modal === 'weight') setWeightModalOpen(false);
    if (modal === 'steps') setStepsModalOpen(false);
    if (modal === 'heart') setHeartModalOpen(false);
    if (modal === 'time') setTimeModalOpen(false);
  };

  // currently prefilled with some data so it has somethign to read on start up
  // this data obj represents everything that is shown in health data dashboard
  const [healthData, setHealthData] = useState({
    'weightChange': '-2.4lbs',
        'totalSteps': '24,670 steps',
        'avgHeartRate': '72 bpm',
        'allHeartData': [
            { 'month': 'Jan', 'rate': 75 },
            { 'month': 'Feb', 'rate': 78 },
            { 'month': 'Mar', 'rate': 80 },
            { 'month': 'Apr', 'rate': 72 },
            { 'month': 'May', 'rate': 70 },
        ],
        'timeData': {
            'Sleep': 8,
            'Indoor': 10,
            'Outdoor': 6,
        },
  })

  const fetchHealthData = () => {
    axios.get("http://localhost:8000/api/get-health-data/")
      .then(response => {
        console.log(response.data);
        setHealthData(response.data);
      })
      .catch(error => {
        console.log("backend error occured")
      });
  }

//START steps related data
  const [stepsData, setStepsData] = useState({
    stepsDate: '',
    stepsNumber: '',
  });

  const handleStepsEntryChange = (event) => {
    const { name, value } = event.target;
    setStepsData({...stepsData, [name]: value});
  }
  const handleStepsEntry = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8000/api/add-steps-entry/", stepsData) 
      .then(response => {
        console.log(response.data);
        fetchHealthData(); //refreshes health data so it is up to date
        closeModal('steps');
      })
      .catch(error => {
        console.log("backend error occured");
      })
  }

//END steps related data

//START heart related data
  const [heartData, setHeartData] = useState({
    heartEntry: '',
    heartDate: '',
  });

  const handleHeartEntryChange = (event) => {
    const { name, value } = event.target;
    setHeartData({...heartData, [name]: value});
  }
  const handleHeartEntry = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8000/api/add-heart-entry/", healthData) 
      .then(response => {
        console.log(response.data);
        fetchHealthData(); //refreshes health data so it is up to date
        closeModal('heart');
      })
      .catch(error => {
        console.log("backend error occured");
      })
  }

//END heart related data

//START weight related data
  const [weightData, setWeightData] = useState({
    weightEntry: '',
    weightDate: '',
  });
  const handleWeightEntryChange = (event) => {
    const { name, value } = event.target;
    setWeightData({...weightData, [name]: value});
  }
  const handleWeightEntry = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8000/api/add-weight-entry/", weightData) 
      .then(response => {
        console.log(response.data);
        fetchHealthData(); //refreshes health data so it is up to date
        closeModal('weight');
      })
      .catch(error => {
        console.log("backend error occured");
      })
  }
//END weight related data

//START time related data
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownMenu = (choice) => {
    setTimeData({...timeData, type: choice});
    setDropdownOpen(false);
  }

  const [timeData, setTimeData] = useState({
    date: '',
    type: '',
    hours: '',
  });

const handleTimeEntryChange = (event) => {
    const { name, value } = event.target;
    setTimeData({...timeData, [name]: value});
  }

const handleTimeEntry = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8000/api/add-time-entry/", timeData) 
      .then(response => {
        console.log(response.data);
        fetchHealthData(); //refreshes health data so it is up to date
        closeModal('time');
      })
      .catch(error => {
        console.log("backend error occured");
      })
  }

//END time related data
  return (
    <LandingPage>
      <div className="health-data-container">
        <div className="health-data-header">
          <h2>Your Day at a Glance, {userData.firstName} {userData.lastName}</h2>
          <div className="data-buttons">
            <button className="btn btn-primary" onClick={() => openModal('weight')}>+ Weight Data</button>
            <button className="btn btn-primary" onClick={() => openModal('steps')}>+ Steps Data</button>
            <button className="btn btn-primary" onClick={() => openModal('heart')}>+ Heart Data</button>
            <button className="btn btn-primary" onClick={() => openModal('time')}>+ Time Data</button>
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
            <p>{healthData.totalSteps}</p>
            <p>This Week</p>
          </div>
          <div>
            <p>Heart Rate</p>
            <p>{healthData.avgHeartRate}</p>
            <p>Avg This Week</p>
          </div>
        </div>
        <div className="health-data-charts">
          <div className="heart-health-chart">
            <h3>Heart Health</h3>
            <div className="chart-container">
              {/* Render heart rate chart */}
              <div className="heart-rate-chart">
                {healthData.allHeartData.map((data) => (
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
                  style={{ width: `${(healthData.timeData.Sleep / 24) * 100}%` }}
                ></div>
                <div
                  className="indoor-bar"
                  style={{ width: `${(healthData.timeData.Indoor / 24) * 100}%` }}
                ></div>
                <div
                  className="outdoor-bar"
                  style={{ width: `${(healthData.timeData.Outdoor / 24) * 100}%` }}
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
          <form onSubmit={handleWeightEntry}> 
              <h2>Add Weight</h2>
              <div className='form-group'> 
                <input
                  type="date"
                  id="weightDate"
                  name="weightDate"
                  value={weightData.weightDate}
                  onChange={handleWeightEntryChange}
                  required
                />
              </div>
              <div className='form-group'> 
                <input 
                  type="number" 
                  placeholder="Enter Weight in lbs"
                  id="weightEntry"
                  name="weightEntry"
                  value={weightData.weightEntry}
                  onChange={handleWeightEntryChange}
                  required 
                />
              </div>
              <button className="btn btn-primary" type="submit" >Save</button>
          </form>
        </Modal>
      )}

      {isStepsModalOpen && (
        <Modal onClose={() => closeModal('steps')}>
          <form onSubmit={handleStepsEntry}> 
              <h2>Add Steps</h2>
              <div className='form-group'> 
                <input
                  type="date"
                  id="stepsDate"
                  name="stepsDate"
                  value={stepsData.stepsDate}
                  onChange={handleStepsEntryChange}
                  required
                />
              </div>
              <div className='form-group'> 
                <input 
                  type="number" 
                  placeholder="Enter Steps"
                  id="stepsNumber"
                  name="stepsNumber"
                  value={stepsData.stepsNumber}
                  onChange={handleStepsEntryChange}
                  required 
                />
              </div>
              <button className="btn btn-primary" type="submit" >Save</button>
          </form>
        </Modal>
      )}

      {isHeartModalOpen && (
        <Modal onClose={() => closeModal('heart')}>
          <form onSubmit={handleHeartEntry}> 
              <h2>Add Heart Data</h2>
              <div className='form-group'> 
                <input
                  type="date"
                  id="heartDate"
                  name="heartDate"
                  value={heartData.heartDate}
                  onChange={handleHeartEntryChange}
                  required
                />
              </div>
              <div className='form-group'> 
                <input 
                  type="number" 
                  placeholder="Enter Heart Rate in bpm"
                  id="heartEntry"
                  name="heartEntry"
                  value={healthData.heartEntry}
                  onChange={handleHeartEntryChange}
                  required 
                />
              </div>
              <button className="btn btn-primary" type="submit" >Save</button>
          </form>
        </Modal>
      )}

      {isTimeModalOpen && (
        <div className="form-group">
          <Modal onClose={() => closeModal('time')}>
          <form onSubmit={handleTimeEntry}> 
              <h2>Add Time</h2>
              <div className='form-group'> 
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={timeData.date}
                  onChange={handleTimeEntryChange}
                  required
                />
              </div>
              <div className='form-group'> 
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" onClick={() => setDropdownOpen(!dropdownOpen)} aria-haspopup="true" aria-expanded={dropdownOpen ? 'true' : 'false'}>
                    {timeData.type ? timeData.type : 'Select Type'}
                  </button>
                  <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={() => handleDropdownMenu('Indoor')} href="#">Indoor</button>
                    <button className="dropdown-item" onClick={() => handleDropdownMenu('Sleep')}href="#">Sleep</button>
                    <button className="dropdown-item" onClick={() => handleDropdownMenu('Outdoor')} href="#">Outdoor</button>
                  </div>
                </div>
              </div>
              <div className='form-group'> 
                <input 
                  type="number" 
                  placeholder="Enter Hours"
                  id="hours"
                  name="hours"
                  value={timeData.hours}
                  onChange={handleTimeEntryChange}
                  required 
                />
              </div>
              <button className="btn btn-primary" type="submit" >Save</button>
          </form>
          </Modal>
        </div>
      )}
    </LandingPage>
  );
}

export default HealthData;
