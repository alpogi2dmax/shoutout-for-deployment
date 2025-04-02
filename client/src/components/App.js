import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('https://shoutout-for-deployment.onrender.com/users/1')
    // fetch('http://127.0.0.1:5000/users/1')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUser(data)
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  console.log(user)

  return (
    <div className="App">
      <h1>Hello {user.first_name} {user.last_name}!!!</h1>
    </div>
  );
}

export default App;