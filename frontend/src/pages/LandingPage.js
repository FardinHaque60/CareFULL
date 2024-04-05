import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
  const [message, setMessage] = useState('');

  {/* we can go to this link to see debugging info for backend */}
  useEffect(() => {
    axios.get('http://localhost:8000/api/landing-page/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="text-3xl font-bold">
      <h1> Welcome to CareFULL </h1>
      <p> {message} </p> {/* this message is taken from backend */}
    </div>
  );
}

export default LandingPage;