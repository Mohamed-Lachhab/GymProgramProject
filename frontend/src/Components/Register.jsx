import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      setMessage(response.data.message);
      navigate('/login');  // Redirect to login after successful registration
    } catch (error) {
      // Handle error for duplicate email or username
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);  // Display server-side message (e.g., "Email is already taken")
      } else {
        setMessage('Error: An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-black vh-100">
      <div className="card shadow-lg p-4 w-50 w-md-50 w-lg-25 bg-dark">
        <h2 className="text-center mb-4 text-danger">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
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
          <button type="submit" className="btn btn-danger w-100">Register</button>
        </form>
        {message && <div className="alert alert-danger mt-3" role="alert">{message}</div>}
        <div className="text-center mt-3">
          <span className="text-white">Already have an account? </span>
          <a href="/login" className="text-danger">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
