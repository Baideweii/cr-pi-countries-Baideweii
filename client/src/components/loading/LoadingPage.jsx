import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateCountries } from '../../redux/actions';
import './LoadingPage.css';
import LoadingGif from '../../images/loading.gif';

// Importar las imágenes de fondo directamente
import background0 from '../../images/background0.png';
import background1 from '../../images/background1.png';
import background2 from '../../images/background2.png';
import background3 from '../../images/background3.png';
import background4 from '../../images/background4.png';
import background5 from '../../images/background5.png';
import background6 from '../../images/background6.png';
import background7 from '../../images/background7.png';
import background8 from '../../images/background8.png';
import background9 from '../../images/background9.png';
import background10 from '../../images/background10.png';
import background11 from '../../images/background11.png';
import background12 from '../../images/background12.png';

function LoadingPage({ updateCountries, setBackground }) {
    const navigate = useNavigate();
    const [images, setImages] = useState(null);

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
    
    const loadImages = async () => {
        const loadedImages = [
            background0, 
            background1, 
            background2,
            background3,
            background4,
            background5,
            background6,
            background7,
            background8,
            background9,
            background10,
            background11,
            background12,

        ];

        // Puedes mantener esta parte si necesitas esperar a que las imágenes se carguen completamente
        const imagePromises = loadedImages.map(img => {
            return new Promise((resolve, reject) => {
                const imageObj = new Image();
                imageObj.src = img;
                imageObj.onload = () => resolve(imageObj);
                imageObj.onerror = reject;
            });
        });

        try {
            await Promise.all(imagePromises);
            return loadedImages;
        } catch (error) {
            console.error("Error al cargar imágenes:", error);
            throw error;
        }
    };

    const getCountries = async () => {
        try {
            const { data } = await axios.get(URL_COUNTRIES);
            updateCountries(data);
            const loadedImages = await loadImages();
            setImages(loadedImages);
            setBackground(loadedImages[0]); // Establecer el fondo después de cargar
            postActivities(); // Después de obtener los países, publicar actividades
        } catch (error) {
            console.error(error);
        }
    };

    const postActivities = async () => {
        try {
            for (const activity of activities) {
                await axios.post(URL_ACTIVITIES, activity);
            }
            navigate('/home');
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
