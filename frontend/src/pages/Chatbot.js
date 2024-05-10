import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Chatbot.css';
import LandingPage from "./LandingPage";
import ReactMarkdown from 'react-markdown';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState({ userMsg: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/load-history/')
      .then(response => {
        setMessages(response.data);
        console.log(messages);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrompt({ ...prompt, [name]: value });
  }

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessages([...messages, { role: 'user', content: prompt.userMsg }])
    axios.post('http://localhost:8000/api/get-message/', prompt)
      .then(response => {
        const msg = response.data;
        setMessages([...messages, { role: 'user', content: prompt.userMsg }, { role: 'assistant', content: msg }]);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
        setIsLoading(false);
      });
    setPrompt({ userMsg: '' });
  }

  const clearChatHistory = (e) => {
    axios.get('http://localhost:8000/api/clear-chat-history/')
      .then(response => {
        setMessages(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      });
  }

  return (
    <LandingPage>
      <div className="chatbot-container">
        <button
          className="btn btn-danger"
          onClick={clearChatHistory}
        > Clear Chat </button>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <form onSubmit={handleMsgSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="userMsg"
                name="userMsg"
                value={prompt.userMsg}
                onChange={handleChange}
                placeholder="Ask me about anything health related"
                disabled={isLoading}
                required
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LandingPage>
  );
}

export default Chatbot;