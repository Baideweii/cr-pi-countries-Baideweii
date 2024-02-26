import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, name, continent, image }) {
  return (
    <Link to={`/detail/${id}`} className="card-link">
      <figure className="card">
        <img src={image} alt={name} />
        <figcaption>
          <div className='figure-content'>
            <div className='name'>{name}</div>
            <div className='continent'>{continent}</div>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

export default Card;
