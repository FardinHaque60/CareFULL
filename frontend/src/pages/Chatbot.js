import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/chatbot/') //backend link, use for debugging
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="text-3xl font-bold">
      <h1> Chatbot </h1>
    </div>
  );
}

export default Chatbot; 