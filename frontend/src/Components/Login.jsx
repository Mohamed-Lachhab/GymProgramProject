import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
  
      // Save the token and username to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);  // Save username
  
      setMessage(response.data.message);
  
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-black vh-100">
      <div className="card shadow-lg p-4 w-50 w-md-50 w-lg-25 bg-dark">
        <h2 className="text-center mb-4 text-danger">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Login</button>
        </form>
        {message && <div className="alert alert-danger mt-3" role="alert">{message}</div>}
        <div className="text-center mt-3">
          <span className="text-white">Don't have an account? </span>
          <a href="/register" className="text-danger">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
