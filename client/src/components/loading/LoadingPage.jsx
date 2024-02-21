import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateCountries } from '../../redux/actions';
import './LoadingPage.css';
import LoadingGif from '../../images/loading.gif';

function LoadingPage({ updateCountries, setBackground }) {
    const navigate = useNavigate();

    useEffect(() => {
        const URL_COUNTRIES = 'https://cr-pi-countries-baideweii.onrender.com/countries';
        const URL_ACTIVITIES = 'https://cr-pi-countries-baideweii.onrender.com/activities';
        // const URL_COUNTRIES = 'http://localhost:3001/countries';
        // const URL_ACTIVITIES = 'http://localhost:3001/activities';

    const activities = [
        {
            "name":"Mona Lisa",
            "difficult": 2,
            "duration": 3,
            "season":"Otoño",
            "type":"Artistico",
            "countries":["France"]
          },
        {
            "name":"Diablos Danzantes de Yare",
            "difficult": 3,
            "duration": 12,
            "season":"Primavera",
            "type":"Cultural",
            "countries":["Venezuela"]
          },
        {
            "name":"Partidos de la Champions",
            "difficult": 4,
            "duration": 2,
            "season":"Verano",
            "type":"Deportivo",
            "countries": [
                "Albania",
                "Andorra",
                "Armenia",
                "Austria",
                "Azerbaijan",
                "Belarus",
                "Belgium",
                "Bosnia and Herzegovina",
                "Bulgaria",
                "Croatia",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "England",
                "Estonia",
                "Faroe Islands",
                "Finland",
                "France",
                "Georgia",
                "Germany",
                "Gibraltar",
                "Greece",
                "Hungary",
                "Iceland",
                "Israel",
                "Italy",
                "Kazakhstan",
                "Kosovo",
                "Latvia",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Malta",
                "Moldova",
                "Montenegro",
                "Netherlands",
                "North Macedonia",
                "Northern Ireland",
                "Norway",
                "Poland",
                "Portugal",
                "Republic of Ireland",
                "Romania",
                "Russia",
                "San Marino",
                "Scotland",
                "Serbia",
                "Slovakia",
                "Slovenia",
                "Spain",
                "Sweden",
                "Switzerland",
                "Turkey",
                "Ukraine",
                "Wales"
            ]
          },
          {
            "name":"Acupuntura China",
            "difficult": 2,
            "duration": 3,
            "season":"Otoño",
            "type":"Medicinal",
            "countries":["China"]
          },
          {
            "name":"Vaticano",
            "difficult": 1,
            "duration": 2,
            "season":"Verano",
            "type":"Religioso",
            "countries":["Vatican City"]
          },
          {
            "name":"Barrio rojo de Amsterdam",
            "difficult": 1,
            "duration": 1,
            "season":"Primavera",
            "type":"Sexual",
            "countries":["Netherlands"]
          },
    ]
    
    const getCountries = async () => {
        try {
            const { data } = await axios.get(URL_COUNTRIES);
            updateCountries(data);
            setBackground(); // Establecer el fondo
            navigate('/home')
        } catch (error) {
            console.error(error);
        }
    };

    //Si esta deployado esto no hace falta
    const postActivities = async () => {
        try {
            for (const activity of activities) {
                await axios.post(URL_ACTIVITIES, activity);
            }
            setTimeout(() => {
                navigate('/home');
            }, 2000); // Navegar a /home después de 3 segundos
        } catch (error) {
            console.error(error);
        }
    };

    getCountries();
}, [updateCountries, setBackground, navigate]);

return (
    <div className='loading_container'>
        <img src={LoadingGif} alt='Loading' className='loading_gif' />
    </div>
);
}

const mapDispatchToProps = {
updateCountries,
};

export default connect(null, mapDispatchToProps)(LoadingPage);
