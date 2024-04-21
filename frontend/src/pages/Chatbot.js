import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Chatbot.css';
import LandingPage from "./LandingPage";

function Chatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/load-history/') //backend link, use for debugging
      .then(response => {
        setMessages(response.data);
        console.log(messages);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const [prompt, setPrompt] = useState({
    userMsg: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrompt({...prompt, [name]: value});
  }

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/get-message/', prompt)
      .then(response => {
        const msg = response.data;
        setMessages([...messages, "prompt: " + prompt.userMsg, msg]);
      })
      .catch(error => {
        console.log(error.response.data);
      });

    //setMessages([...messages, prompt]);
    setPrompt({userMsg: ''})
  }

  //chatbot UI is mega scuffed
  return (
    <LandingPage> 
      <div className="container" style={{overflow: 'auto', maxHeight: '700px', width: '1400px'}}>
        <div className="card-columns mt-5">
          {messages.map((item, index) => (
            <div className="card border-0" key={index}>
              <div className="card-body">
                {item}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed-bottom">
          <form onSubmit={handleMsgSubmit}>
            <div className="row"> 
              <div className="col-md-8 mx-auto">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="userMsg"
                    name="userMsg"
                    value={prompt.userMsg}
                    onChange={handleChange}
                    placeholder="Enter something..."
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">⬆</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LandingPage>
  );
}

export default Chatbot; 