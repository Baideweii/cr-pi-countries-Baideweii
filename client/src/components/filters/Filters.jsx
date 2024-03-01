import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterByArea, filterCountries, orderCountries } from '../../redux/actions';
import './Filters.css';

function Filters({ dispatch, handleFilterChange, getActivityType, filterValue, orderValue, typeValue, areaValue }) {
  const [continentSelector, setContinentSelector] = useState(filterValue);
  const [orderSelector, setOrderSelector] = useState(orderValue);
  const [typeSelector, setTypeSelector] = useState(typeValue);
  const [areaSelector, setAreaSelector] = useState(areaValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFilterChange(e);

    if (name === 'continentSelector') {
      setContinentSelector(value);
      dispatch(filterCountries(value));
    } 
    if (name === 'orderSelector') {
      setOrderSelector(value);
      dispatch(orderCountries(value));
    }
    if (name === 'typeSelector') { 
      setTypeSelector(value)
      getActivityType(value)
    }
    if (name === 'areaSelector') {
      setAreaSelector(value)
      dispatch(filterByArea(value));
    }
  };

  const handleCleanse = () => {
    setContinentSelector('All');
    setOrderSelector('None'); 
    setTypeSelector('None');
    setAreaSelector('None')

    dispatch(filterCountries('All'));
    dispatch(orderCountries('None'));
    dispatch(filterByArea('None'))
    getActivityType('None')
  };

  return (
    <div>
      <button onClick={handleCleanse}>Limpiar selecciones</button>
      <select name="orderSelector" onChange={handleChange} value={orderSelector}>
        <option value='None' hidden>Orden</option>
        <option value='None' >Ninguno</option>
        <option value='ME'>Menor a mayor</option>
        <option value='MA'>Mayor a menor</option>
        <option value='Z'>Z-A</option>
        <option value='A'>A-Z</option>
      </select>
      <select name="continentSelector" onChange={handleChange} value={continentSelector}>
        <option value="All" hidden>Continente</option>
        <option value="All" >Todos</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Asia">Asia</option>
        <option value="Antarctica">Antarctica</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
      </select>
      <select name="typeSelector" onChange={handleChange} value={typeSelector}>
        <option value="None" hidden>Actividades</option>
        <option value="None">Ninguno</option>
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
      <select name="areaSelector" onChange={handleChange} value={areaSelector}>
        <option value='None' hidden>Orden</option>
        <option value='None' >Ninguno</option>
        <option value='MA'>Mayor a 900.000</option>
        <option value='ME'>Menor a 9000.000</option>
      </select>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filterValue: state.filter,
  orderValue: state.order,
  typeValue: state.type,
  areaValue: state.area
});

export default connect(mapStateToProps)(Filters);
