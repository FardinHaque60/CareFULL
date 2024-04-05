import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  {/* we can go to this link to see debugging info for backend */}
  useEffect(() => {
    axios.get('http://localhost:8000/api/landing-page/')
      .then(response => {
        //setMessage(response.data.message);
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="text-3xl font-bold">
      <h1> Welcome to CareFULL </h1>
      <p> messages from db: </p>
      <ul> {data.map(item =>
        <li key={item.id}> {item.name} </li>
      )} </ul> {/* this message is taken from backend */}
    </div>
  );
}

export default LandingPage;