import React, { useState } from 'react';

import useLogin from '../hooks/useLogin.js';

const LoginPage = () => {
  const LoginPageStyles = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    margin: 'auto',
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const inputStyles = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  };

  const buttonStyles = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();

  const handleSubmit = () => {
    const validation = true;
    if (validation) {
      login({ email, password });
    } else {
      console.log('Login failed');
    }
  };

  return (
    <div style={LoginPageStyles}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter email"
        style={inputStyles}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        style={inputStyles}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit} style={buttonStyles}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
