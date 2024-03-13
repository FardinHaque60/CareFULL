<<<<<<< HEAD
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
=======
function LandingPage() {
  return (
    <div className="text-3xl font-bold underline">
      Hello world!
>>>>>>> 2270c9a55b5c6844476c317111dd335b00c1dfa6
    </div>
  );
}

export default LandingPage;