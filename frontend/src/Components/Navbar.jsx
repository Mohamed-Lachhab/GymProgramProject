import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? 'navbar-dark bg-black shadow' : 'navbar-dark bg-transparent'
      }`}
      style={{ transition: 'background-color 0.3s ease' }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <ul className="navbar-nav me-auto d-flex align-items-center">
          <li className="nav-item">
            <a className="text-center text-white" href="#features">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="text-center text-white" href="/login">
              Login
            </a>
          </li>
        </ul>

        <a href="/" className="navbar-brand mx-auto">
          <img
            src={logo}
            alt="Logo"
            className="d-block mx-auto"
            style={{ width: '90px' }}
          />
        </a>

        <ul className="navbar-nav ms-auto d-flex align-items-center">
          <li className="nav-item">
            <a className="text-center text-white" href="/register">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="text-center text-white" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
