import React, { useEffect, useState } from 'react';
import LandingPage from "./LandingPage";
import './css/Appointments.css';
import axios from 'axios';

function Appointments() {
  const [appointments, setAppointments] = useState([
    { title: 'Fardin', date: '2024-04-12', time: '10:00 AM', description: 'Performance review' },
    { title: 'Isaac', date: '2024-04-12', time: '11:00 AM', description: 'Performance review' },
    { title: 'Kailer', date: '2024-04-12', time: '12:00 PM', description: 'Performance review' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/get-appointments/')
      .then(response => {
        const parsedData = Object.keys(response.data).map(key => response.data[key]);
        setAppointments([...appointments, ...parsedData]);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAppointment({...newAppointment, [name]: value,});
  };

  const [saveStatus, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/save-appointment/', newAppointment)
      .then(response => {
        console.log(response.data);
        setStatus('success');
        setAppointments([...appointments, newAppointment]);
      })
      .catch(error => {
        console.log(error.response.data);
        setStatus('fail');
      });

    setNewAppointment({
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
          <h2>Add New Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newAppointment.title}
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
                value={newAppointment.date}
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
                value={newAppointment.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newAppointment.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            {saveStatus === "success" && <div className="alert alert-success">Appointment Saved Succesfully</div>}
            {saveStatus === "fail" && <div className="alert alert-danger">Could not save Appointment</div>}
            <button type="submit">Add Appointment</button>
          </form>
        </div>
        <div className="appointments-list">
          <h2>Upcoming Appointments</h2>
          <div className="appointment-items">
            {appointments.map((appointment, index) => (
              <div key={index} className="appointment-item">
                <h3>{appointment.title}</h3>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Description: {appointment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LandingPage>
  );
}

export default Appointments;