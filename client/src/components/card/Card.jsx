import React from 'react'
import { Link } from 'react-router-dom'

function Card({ id, name, continent, image }) {
    return (
        <div className='card'>
            <Link to={`/detail/${id}`}>
                <img src={image} alt={name}></img>
            </Link>
            <h4>{name}</h4>
            <h4>{continent}</h4>
        </div>
    )
}

export default Card