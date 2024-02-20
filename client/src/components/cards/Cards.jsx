import React from 'react';
import Card from '../card/Card';
import "./Cards.css"

function Cards(props) { 
    const { countries } = props;

    return (
        <div className='cards-container'>
            {countries.map((country) => (
                <Card 
                    key={country.id}
                    id={country.id}
                    name={country.name}
                    image={country.image}
                    continent={country.continent}
                />
            ))}
        </div>
    );
}

export default Cards;
