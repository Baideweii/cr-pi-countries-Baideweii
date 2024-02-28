import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URLS from '../../helpers/urlHelper';
import './Detail.css'
import detailTittleImage from '../../images/detail-tittle.png'
import activityTittleImage from '../../images/detail-activity-tittle.png'
import activityImage from '../../images/detail-activity.png'
import detailBackground from '../../images/detail.png'

function Detail() {
    const { id } = useParams();
    const [country, setCountry] = useState({});
    const [activities, setActivities] = useState([]);
    const [openStreetMapsUrl, setOpenStreetMapsUrl] = useState('');

    const URL = `${URLS.theUrl}/countries`;

    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then(({ data }) => {
                if (data) {
                    setCountry(data);
                    if (data.Activities) {
                        setActivities(data.Activities);
                    }
                    if (data.maps) {
                        generateOpenStreetMapsUrl(data.maps[0], data.maps[1]);
                    }
                } else {
                    window.alert('No hay ningún país con ese ID');
                }
            })
            .catch((error) => {
                console.error('Error fetching country detail:', error);
            });
    }, [id]);

    const generateOpenStreetMapsUrl = (latitude, longitude) => {
        const bbox = `${longitude - 10},${latitude - 10},${longitude + 10},${latitude + 10}`; 
        const openStreetMapsUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
        setOpenStreetMapsUrl(openStreetMapsUrl);
    };

    return (
        <div>
            <div className='detail-container'>
                <img className='detail-flag' src={country.image} alt={country.name} />
    
                {country.id && <p className="country-id">Abreviatura: <br></br>{country.id}</p>}
              
                {country.capital && <p className="country-capital">Capital: <br></br>{country.capital}</p>}
              
                <h1 className='country-name'>
                    <span className='detail-span'>{country.officialName}</span>
                    <img className='detail-tittle' src={detailTittleImage} alt='' />
                    <img className='detail-coat' src={country.coat} alt={country.name} />
                </h1>
    
                {country.languages && <p className="country-languages">Lengua:<br></br> {country.languages}</p>}
               
                {country.area && <p className="country-area">Area: {country.area} km2</p>}
                {country.poblation && <p className="country-poblation">Población: <br></br>{country.poblation}</p>}
                {country.currencies && <p className="country-currencies">Moneda: <br></br>{country.currencies}</p>}
                {country.continent && <p className="country-continent">Continente: <br></br>{country.continent}</p>}
                {country.subregion && <p className="country-subregion">Subcontinente: <br></br>{country.subregion}</p>}
                {openStreetMapsUrl && (
                    <div className="country-maps">
                        <iframe
                        className='detail-map'
                        title="Map"
                        src={openStreetMapsUrl}
                        />
                    </div>
                )}
            </div>
            <div>
                {activities.length > 0 && (
                    <div className='activities-title'>
                        <h2 className='activities-title-text'>Actividades en este país:</h2>
                        <img className='activities-title-image' src={activityTittleImage} alt='' />
                    </div>
                )}
                {activities.map(activity => (
                    <div key={activity.id} className="activity-item" style={{ backgroundImage: `url(${activityImage})` }}>
                        <div className="activity-item-content">
                            <h3>{activity.name}</h3>
                                <p>Dificultad: {activity.difficult}</p>
                                <p>Duración: {activity.duration}</p>
                                <p>Temporada: {activity.season}</p>
                                <p>Tipo: {activity.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Detail;
