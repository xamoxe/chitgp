import React, { useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = io('http://localhost:5000');

  socket.on('message', (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <Head>
        <title>Chitpg - Chat App</title>
      </Head>
      <div>
        <h1>Chitpg</h1>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
