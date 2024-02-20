import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, name, continent, image }) {
  return (
    <figure>
      <Link to={`/detail/${id}`}>
        <img src={image} alt={name} />
        <figcaption>
          <div className='figure-content'>
            <div className='name'>{name}</div>
            <div className='continent'>{continent}</div>
          </div>
        </figcaption>
      </Link>
    </figure>
  );
}

export default Card;

{/* <div className='card'>
            <Link to={`/detail/${id}`}>
                <img src={image} alt={name}></img>
            </Link>
            <h4>{name}</h4>
            <h4>{continent}</h4>
        </div> */}