import React from 'react';
import banner from '../images/banner.png';

function Header() {
  return (
    <header
      id="main"
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: '100vh',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          zIndex: 1,
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2>BEGIN YOUR</h2>
        <h1>
          <span className="text-danger">PROGRAM</span> WITH US
        </h1>
        <p className="lead">Build your fitness program with us</p>
        <div className="mt-4">
          <a href="#header" className="btn btn-danger btn-lg">
            JOIN US
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
