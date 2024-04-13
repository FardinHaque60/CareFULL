import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-user-status/')
      .then(response => {
        const msg = response.data
        if (msg.message === 'already logged in' ? setLogin(true) : console.log(response.data));
      })
  }, []);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({...formData, [id]: value});
  }

  const [validCredentials, setCredentials] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/login/', formData)
      .then(response => {
        console.log(response.data.message);
        setFormData({
          email: '',
          password: '',
        })
        navigate('/');
      }
      ).catch(error => {
        if (error.response.data.error === 'invalid credentials' ? setCredentials(false) : console.log(error.message));
      })
  }

  return (
    <div style={{background: 'linear-gradient(to bottom, #e7f3f1, #ffffff)'}}> {/* whole page background */}
      <div className="container d-flex justify-content-center align-items-center vh-100"> {/* Center everything vertically and horizontally */}
        <div className="text-center text-3xl font-bold p-4 d-flex justify-content-center align-items-center">
          <div>
            <h1> Login </h1>
            <div className="form-text mb-3"> Don't have an Account? <Link to="/create-account"> Create Account </Link> </div>
            {loggedIn && <div className="alert alert-success" role='alert'> Looks like you are already signed in <Link to='/'> Visit Dashboard </Link></div> }
          </div>
          <div style={{display: 'inline-block', margin: '0 50px', borderLeft: '2px solid black', height: '350px' }}></div>
        </div>
        <div className="p-9">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={formData.email} id="email" aria-describedby="emailHelp" onChange={handleChange}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={formData.password} id="password" onChange={handleChange}/>
            </div>
            {!validCredentials && <div className="alert alert-danger" role="alert">Invalid Credentials</div>}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;