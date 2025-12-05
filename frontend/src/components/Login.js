// frontend/src/components/Login.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { Link } from 'react-router-dom';
import './Form.css'; // Import the styles

function Login() {
  const { login } = useAuth(); // Get the login function from our context
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const { email, password } = formData;

  // Handle changes in the form fields
  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      // Pass the *entire* user object (data) to the login context
      // The context will handle saving to localStorage and redirecting
      login(data);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        
        {error && <p className="form-error">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email" // Added name for onChange
            value={email}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password" // Added name for onChange
            value={password}
            onChange={onChange}
            required
          />
        </div>
        
        <button type="submit" className="form-btn">Login</button>
        
        <p className="form-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;