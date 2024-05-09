import React, { useEffect, useState } from 'react';
import '../pages/css/Appointments.css';
import { Form, Button } from 'react-bootstrap';

const Appointment = ({ appointment, index, onDelete, onSave }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [currAppt, setCurrAppt] = useState({
    'id': appointment.id,
    'title': appointment.title,
    'date': appointment.date,
    'time': appointment.data_time,
    'description': appointment.description
  });

  useEffect(() => {
    setCurrAppt({
      'id': appointment.id,
      'title': appointment.title,
      'date': appointment.date,
      'time': appointment.data_time,
      'description': appointment.description
    });
  }, [appointment]);

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrAppt({...currAppt, [name]: value});
  }

  const handleSubmit = () => {
    console.log(currAppt);
    onSave(currAppt);
    setExpanded(false);
  }

  return (
      <div key={index} className="appointment-item">
        <div> 
          {!expanded ?
          <>
          <h3>{appointment.title}</h3>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <p>Description: {appointment.description}</p>
          </>
          : (
          <div style={{ marginTop: '10px'}}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currAppt.title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={currAppt.date}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={currAppt.time}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={currAppt.description}
                  onChange={handleEditChange}
                ></textarea>
              </div>
              <div className='text-center'>
                <button type="submit">Save</button> 
              </div>
            </form>
          </div>
          )}
          <div className='options'>  
            {!expanded ? 
                <span className='btn btn-primary' onClick={toggleExpand}> Edit </span>
            : <span className='btn btn-primary' onClick={toggleExpand}> Cancel </span>
            }
            <span className='btn btn-danger' onClick={onDelete}> Delete </span>
          </div>
        </div>
      </div>
    )
}

export default Appointment;