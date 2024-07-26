import React, { useState } from 'react';
import useSignup from '../hooks/useSignup.js';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const SignupPageStyles = {
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useSignup();

  const handleSubmit = () => {
    const validation = true;
    if (validation) {
      signup({ name, email, password });
      navigate(`/login?email=${email}`);
    } else {
      console.log('Signup failed');
    }
  };

  return (
    <div style={SignupPageStyles}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter username"
        style={inputStyles}
        onChange={(e) => setName(e.target.value)}
      />

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
        Sign Up
      </button>
    </div>
  );
};

export default SignupPage;
