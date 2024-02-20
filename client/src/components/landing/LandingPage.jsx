// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage({ handleAccess }) {
  return (
    <div>
      <div className="earth-container">
        <Link to="/loading">
          <img className='earth' src='../src/images/landingearth.png' alt="Home" onClick={handleAccess} style={{ cursor: 'pointer' }}></img>
        </Link>
      </div>
    </div>
  );
}
