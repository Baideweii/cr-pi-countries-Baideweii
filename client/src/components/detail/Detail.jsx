import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URLS from '../../helpers/urlHelper';

function Detail() {
    const { id } = useParams();
    const [country, setCountry] = useState({});
    const [activities, setActivities] = useState([]);

    const URL = `${URLS.theUrl}/countries`;

    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then(({ data }) => {
                if (data) {
                    setCountry(data);
                    if (data.Activities) {
                        setActivities(data.Activities);
                    }
                } else {
                    window.alert('No hay ningún país con ese ID');
                }
            })
            .catch((error) => {
                console.error('Error fetching country detail:', error);
            });
    }, [id]);

    return (
        <div>
            <div>
                <h1>{country.officialName}</h1>

                <img src={country.image} alt={country.name} />

                <img src={country.coat} alt={country.name} />

                {country.id && <p>Abreviatura: {country.id}</p>}

                {country.capital && <p>Capital: {country.capital}</p>}

                {country.languages && <p>Languages: {country.languages}</p>}

                {country.area && <p>Area: {country.area} km2</p>}

                {country.poblation && <p>Población: {country.poblation}</p>}

                {country.currencies && <p>Currencies: {country.currencies}</p>}

                {country.continent && <p>Continent: {country.continent}</p>}

                {country.subregion && <p>SubContinent: {country.subregion}</p>}

                {country.maps && <p>Google Maps: <a href={country.maps} target='_blank' rel="noopener noreferrer">Click here</a></p>}
            </div>
            <div>
                <h2>Actividades en este país:</h2>
                {activities.length > 0 && activities.map(activity => (
                    <div key={activity.id}>
                        <h3>{activity.name}</h3>
                        <p>Difficult: {activity.difficult}</p>
                        <p>Duration: {activity.duration}</p>
                        <p>Season: {activity.season}</p>
                        <p>Type: {activity.type}</p>
                    </div> 
                ))}
            </div>     
        </div>
    );
}

export default Detail;
