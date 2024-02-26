import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import LandingEarth from '../../images/landingearth.png'

export default function LandingPage({ handleAccess }) {
  return (
    <div>
      <div className="earth-container">
        <Link to="/loading">
          <img className='earth' src={LandingEarth} alt="Home" onClick={handleAccess} style={{ cursor: 'pointer' }}></img>
        </Link>
      </div>
    </div>
  );
}
