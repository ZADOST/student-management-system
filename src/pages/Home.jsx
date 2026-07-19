import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <h1 className="hero-title">Academic Management, Simplified.</h1>
      <p className="hero-subtitle">
        A centralized platform designed for modern educational institutions in the Kurdistan Region. Manage computer education student records, track daily attendance, and streamline faculty workflows.
      </p>
      
      <div className="button-group">
        <Link to="/login" className="btn-primary-large">Secure Login</Link>
        <Link to="/register" className="btn-secondary-large">Register Account</Link>
      </div>
    </div>
  );
};

export default Home;