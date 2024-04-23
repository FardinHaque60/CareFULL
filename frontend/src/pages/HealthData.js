import React, { useEffect, useState } from 'react';
import LandingPage from "./LandingPage";
import './css/HealthData.css';
import axios from 'axios';

function HealthData() {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => { //overwrites existing HealthDatas with fetched data from backend
    axios.get('http://localhost:8000/api/get-health-data/')
      .then(response => {
        console.log(response.data);
        setHealthData(response.data)
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  const [newHealthData, setNewHealthData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewHealthData({...newHealthData, [name]: value});
  };

  const [saveStatus, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/save-health-data/', newHealthData)
      .then(response => {
        console.log(response.data);
        setStatus('success');
        fetchData();
      })
      .catch(error => {
        console.log(error.response.data);
        setStatus('fail');
      });
      
    setNewHealthData({
      title: '',
      date: '',
      time: '',
      description: '',
    });
  };

  return (
    <LandingPage>
      <div className="appointments-container">
        <div className="form-container">
          <h2>Add New Health Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newHealthData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newHealthData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={newHealthData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newHealthData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            {saveStatus === "success" && <div className="alert alert-success">Health Data Saved Succesfully</div>}
            {saveStatus === "fail" && <div className="alert alert-danger">Could not save Health Data</div>}
            <button type="submit">Add Health Data</button>
          </form>
        </div>
        <div className="appointments-list">
          <h2>Upcoming Health Data</h2>
          <div className="appointment-items">
            {healthData.map((HealthData, index) => (
              <div key={index} className="appointment-item">
                <h3>{HealthData.title}</h3>
                <p>Date: {HealthData.date}</p>
                <p>Time: {HealthData.time}</p>
                <p>Description: {HealthData.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LandingPage>
  );
}

export default HealthData;