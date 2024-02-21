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
                <h1>{country.name}</h1>
                <img src={country.image} alt={country.name} />
                {country.id && <p>Abreviatura: {country.id}</p>}
                {country.continent && <p>Continent: {country.continent}</p>}
                {country.capital && <p>Capital: {country.capital}</p>}
                {country.subregion && <p>SubContinent: {country.subregion}</p>}
                {country.area && <p>Area: {country.area} km2</p>}
                {country.population && <p>Población: {country.population}</p>}
                {country.latitude && country.longitude && (
                    <div>
                        <p>Google Maps:</p>
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${country.latitude},${country.longitude}&zoom=10&size=600x400&key=TU_API_KEY`}
                            alt="Mapa de Google"
                        />
                    </div>
                )}
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
