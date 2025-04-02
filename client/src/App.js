import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://shoutout-for-deployment.onrender.com/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  console.log(message)

  return (
    <div className="App">
      <h1>Message from Flask: {message}</h1>
    </div>
  );
}

export default App;