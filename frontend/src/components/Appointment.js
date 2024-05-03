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
                    <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={currAppt.title}  name="title" onChange={handleEditChange} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={currAppt.date} name="date"  onChange={handleEditChange} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" value={currAppt.time} name="time" onChange={handleEditChange} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={currAppt.description} name="description" onChange={handleEditChange} />
                    </Form.Group>
                    <Form.Group className="text-center" style={{ paddingTop: '10px' }}> {/* Centering the Save button */}
                    <Button variant="primary" onClick={handleSubmit} >Save</Button>
                    </Form.Group>
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