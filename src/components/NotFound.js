// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" className="home-link">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
