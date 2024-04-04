import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="text-3xl font-bold">
      <h1> Create an Account </h1>
    </div>
  );
}

export default CreateAccount; 