import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/CreateAccount.css';

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordMatch, setPassword] = useState(true); //boolean for passwords matching
  const [validFields, setFieldCheck] = useState(true); //boolean for fields filled

  const handleChange = (e) => { //handles updating form data given inputs
    const {id, value} = e.target;
    setFormData({...formData, [id]: value}); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setFieldCheck(true);
    setPassword(true);
    axios.post("http://localhost:8000/api/create-account/", formData)
      .then(response => {
        console.log(response.data.message);
        setFormData({ //reset form to blank after submitted
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        navigate('/');
      })
      .catch(error => {
        const msg = error.response.data.error;
        if (msg === 'invalid fields') {
          setFieldCheck(false);
          return;
        }
        else if (msg === 'password mismatch') {
          setPassword(false);
          return;
        }
        else {
          console.log('error', error.response.data.error);
        }
      });
  } 

  return (
    <div style={{background: 'linear-gradient(to bottom, #e7f3f1, #ffffff)'}}> {/* whole page background */}
      <div className="container d-flex justify-content-center align-items-center vh-100"> {/* Center everything vertically and horizontally */}
        <div className="text-center text-3xl font-bold p-4 d-flex justify-content-center align-items-center">
          <div> 
            <h1> Create Account </h1>
            <div className="form-text mb-3"> Already Have an Account? <Link to="/login"> Login </Link> </div>
          </div>
          <div style={{display: 'inline-block', margin: '0 50px', borderLeft: '2px solid black', height: '350px' }}></div>
        </div>
        <div className="p-9">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" class="form-label">First Name</label>
              <input type="name" class="form-control" value={formData.firstName} id="firstName" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" class="form-label">Last Name</label>
              <input type="name" class="form-control" value={formData.lastName} id="lastName" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" class="form-label">Email address</label>
              <input type="email" class="form-control" value={formData.email} id="email" aria-describedby="emailHelp" onChange={handleChange}/>
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" class="form-label">Password</label>
              <input type="password" class="form-control" value={formData.password} id="password" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" class="form-label">Re-enter Password</label>
              <input type="password" class="form-control" value={formData.confirmPassword} id="confirmPassword" onChange={handleChange}/>
            </div>
            {!passwordMatch && <div className="alert alert-danger" role="alert">Passwords do not match</div>}
            {!validFields && <div className="alert alert-danger" role="alert">Invalid Field(s)</div>}
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount; 