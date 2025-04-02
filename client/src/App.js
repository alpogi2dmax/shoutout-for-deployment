import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://shoutout-for-deployment.onrender.com/users/1')
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  console.log(message)

  return (
    <div className="App">
      <h1>Hello {message.first_name} {message.last_name}!!!</h1>
    </div>
  );
}

export default App;