// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage({ handleAccess }) {
  return (
    <div>
      <div className="earth-container">
        <Link to="/loading">
          <img className='earth' src='https://countriesgerant.netlify.app/client/src/images/landingearth.png' alt="Home" onClick={handleAccess} style={{ cursor: 'pointer' }}></img>
        </Link>
        <Link to="/loading">
          <a onClick={handleAccess}>Home</a>
        </Link>
      </div>
    </div>
  );
}
