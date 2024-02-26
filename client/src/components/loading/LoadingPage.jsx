import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateCountries } from '../../redux/actions';
import './LoadingPage.css';
import LoadingGif from '../../images/loading.gif';
import URLS from '../../helpers/urlHelper';

function LoadingPage({ updateCountries, setBackground }) {
    const navigate = useNavigate();

    useEffect(() => {
        const URL_COUNTRIES = `${URLS.theUrl}/countries`;
        const URL_ACTIVITIES = `${URLS.theUrl}/activities`;

    const activities = [
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
    ]

    // const postActivities = async () => {
    //     try {
    //         for (const activity of activities) {
    //             await axios.post(URL_ACTIVITIES, activity);
    //         }
    //         setTimeout(() => {
    //             navigate('/home');
    //         }, 2000); 
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    
    const getCountries = async () => {
        try {
            const { data } = await axios.get(URL_COUNTRIES);
            updateCountries(data);
            setBackground(); 
            // postActivities();
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
