import React, { useEffect, useState } from 'react';
import LandingPage from "./LandingPage";
import './css/Appointments.css';
import axios from 'axios';
import Appointment from '../components/Appointment';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [saveStatus, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/get-appointments/')
      .then(response => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const today = new Date().toISOString().split("T")[0]; 
    if (newAppointment.date < today) {
      setErrorMessage('Date must be today or in the future');
      return;
    }

    axios.post('http://localhost:8000/api/save-appointment/', newAppointment)
      .then(response => {
        console.log(response.data);
        setStatus('success');
        setErrorMessage('');
        fetchData();
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

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  const handleDelete = (appointment) => {
    console.log(appointment.id);
    axios.post("http://localhost:8000/api/delete-appointment/", appointment)
      .then(response => {
        console.log(response.data);
        fetchData();
        setDeleteStatus(true);
      })
      .catch(error => {
        console.log("Backend error occurred");
      });
  };

  const handleSave = (editAppt) => {
    axios.post("http://localhost:8000/api/edit-appointment/", editAppt)
      .then(response => {
        console.log(response.data);
        fetchData();
        setEditStatus(true);
      })
      .catch(error => {
        console.log("Backend error occurred");
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
              ></textarea>
            </div>
            {errorMessage && 
            <div className="alert alert-danger">
              {errorMessage}
              <button type="button" className="close-btn" onClick={() => setErrorMessage('')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
            {saveStatus === "success" && 
            <div className="alert alert-success">
              Appointment Saved Successfully
              <button type="button" className="close-btn" onClick={() => setStatus('')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
            {saveStatus === "fail" && 
            <div className="alert alert-danger">
              Could not save Appointment
              <button type="button" className="close-btn" onClick={() => setStatus('')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
            <button type="submit">Add Appointment</button>
          </form>
        </div>
        <div className="appointments-list">
          <h2>Upcoming Appointments</h2>
          {editStatus ?
          <div className="alert alert-success">
            Appointment Edited Successfully
            <button type="button" className="close-btn" onClick={() => setEditStatus(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          : null }
          {deleteStatus ?
          <div className="alert alert-success">
            Appointment Deleted Successfully
            <button type="button" className="close-btn" onClick={() => setDeleteStatus(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          : null }
          <div className="appointment-items">
            {appointments.map((appointment, index) => (
              <Appointment 
                appointment={appointment}
                index={index}
                onDelete={() => handleDelete(appointment)}
                onSave={(editAppt) => handleSave(editAppt)}
              />
            ))}
          </div>
        </div>
      </div>
    </LandingPage>
  );
}

export default Appointments;
