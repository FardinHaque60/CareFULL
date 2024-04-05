import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/CreateAccount.css';

function CreateAccount() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/create-account/') //backend link, use for debugging
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{background: 'linear-gradient(to bottom, #e7f3f1, #ffffff)'}}> {/* whole page background */}
      <div className="container d-flex justify-content-center align-items-center vh-100"> {/* Center everything vertically and horizontally */}
        <div className="text-center text-3xl font-bold p-4 d-flex justify-content-center align-items-center">
          <h1> Create Account </h1>
          <div style={{display: 'inline-block', margin: '0 50px', borderLeft: '2px solid black', height: '350px' }}></div>
        </div>
        <div className="p-9">
          <form>
            <div class="mb-3">
              <label for="InputName" class="form-label">Name</label>
              <input type="name" class="form-control" id="InputName"/>
            </div>
            <div class="mb-3">
              <label for="InputEmail" class="form-label">Email address</label>
              <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp"/>
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="InputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="InputPassword1"/>
            </div>
            <div class="mb-3">
              <label for="InputPassword2" class="form-label">Re-enter Password</label>
              <input type="password" class="form-control" id="InputPassword2"/>
            </div>
            {/* 
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">Remember Me</label>
            </div>
            */}
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount; 