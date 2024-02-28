import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { validateName, validateDifficulty, validateDuration, validateSeason, validateType } from '../../validations/validation';
import URLS from '../../helpers/urlHelper';
import './ActivityForm.css'
import { Link } from 'react-router-dom';

const ActivityForm = ({ allCountries }) => {

  const URL_ACTIVITIES = `${URLS.theUrl}/activities`;

  const [formData, setFormData] = useState({
    name: '',
    difficult: '',
    duration: '',
    season: '',
    type: '',
    countries: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    difficult: '',
    duration: '',
    season: '',
    type: '',
  });

  const [formValid, setFormValid] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const isValid = Object.values(errors).every(error => error === '');
    const isFilled = Object.values(formData).every(value => value !== '');
    const isCountryFilled = formData.countries.length > 0;
    setFormValid(isValid && isFilled && isCountryFilled);
  }, [formData, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleAddCountry = () => {
    if (selectedCountry && !formData.countries.includes(selectedCountry)) {
      setFormData(prevState => ({
        ...prevState,
        countries: [...prevState.countries, selectedCountry],
      }));
      setSelectedCountry('');
    }
  };

  const handleRemoveCountry = (country) => {
    const updatedCountries = formData.countries.filter(c => c !== country);
    setFormData({ ...formData, countries: updatedCountries });
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        setErrors({ ...errors, name: validateName(value) });
        break;
      case 'difficult':
        setErrors({ ...errors, difficult: validateDifficulty(value) });
        break;
      case 'duration':
        setErrors({ ...errors, duration: validateDuration(value) });
        break;
      case 'season':
        setErrors({ ...errors, season: validateSeason(value) });
        break;
      case 'type':
        setErrors({ ...errors, season: validateType(value) });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {
      name: validateName(formData.name),
      difficult: validateDifficulty(formData.difficult),
      duration: validateDuration(formData.duration),
      season: validateSeason(formData.season),
      type: validateType(formData.type),
    };

    setErrors(formErrors);

    if (Object.values(formErrors).some(err => err !== '')) {
      return;
    }

    try {
      const { name, difficult, duration, season, type, countries } = formData;
      await axios.post(URL_ACTIVITIES, { name, difficult, duration, season, type, countries });
      alert('Actividad turística creada exitosamente');
      setFormData({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        type: '',
        countries: [],
      });
      setErrors({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        type: '',
      });
    } catch (error) {
      alert(`Error al crear la actividad turística: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div>
      <Link to='/home'>
        <button className='home_button_form'>Home</button>
      </Link>
    <form onSubmit={handleSubmit} className='activity-form'>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.name}</div>
      </label>
      <br />
      <label>
        Dificultad:
        <input
          type="text"
          name="difficult"
          value={formData.difficult}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.difficult}</div>
      </label>
      <br />
      <label>
        Duración (en horas):
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.duration}</div>
      </label>
      <br />
      <label>
        Temporada:
        <select name="season" value={formData.season} onChange={handleChange} required>
          <option hidden>Seleccione una temporada</option>
          <option value="Invierno">Invierno</option>
          <option value="Otoño">Otoño</option>
          <option value="Primavera">Primavera</option>
          <option value="Verano">Verano</option>
        </select>
        <div className="error">{errors.season}</div>
      </label>
      <br />
      <br />
      <label>
        Tipo:
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option hidden>Selecciona un tipo</option>
          <option value="Artistico">Artístico</option>
          <option value="Cultural">Cultural</option>
          <option value="Deportivo">Deportivo</option>
          <option value="Ecologico">Ecológico</option>
          <option value="Gastronomico">Gastronómico</option>
          <option value="Medicinal">Medicinal</option>
          <option value="Ocio">Ocio</option>
          <option value="Recreativo">Recreativo</option>
          <option value="Religioso">Religioso</option>
        </select>
        <div className="error">{errors.season}</div>
      </label>
      <br />
      <label>
        Países:
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="" disabled>
            Selecciona un país
          </option>
          {allCountries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddCountry}>Añadir</button>
        <div>
          <h4>Países seleccionados:</h4>
          {formData.countries.map((country, index) => (
            <div key={index}>
              {country}
              <button type="button" onClick={() => handleRemoveCountry(country)}>X</button>
            </div>
          ))}
        </div>
      </label>
      <br />
      <button type="submit" disabled={!formValid}>Crear Actividad Turística</button>
    </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCountries: state.allCountries,
});

export default connect(mapStateToProps)(ActivityForm);
