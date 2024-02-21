import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cards from '../cards/Cards';
import Pagination from '../pagination/Pagination';
import SearchBar from '../searchbar/SearchBar';
import { Link } from 'react-router-dom';
import Filters from '../filters/Filters';
import axios from "axios";

function HomePage({ countries }) {
  const [allCountries, setAllCountries] = useState(countries);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10

  const [searchBarInput, setSearchBarInput] = useState('');
  
  const [filterValue, setFilterValue] = useState("All");

  useEffect(() => {
    setCurrentPage(1); 
  }, [countries]);

  useEffect(() => {
    setAllCountries(countries);
  }, [countries]);

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  const nPages = Math.ceil(allCountries.length / cardsPerPage);
    
  const onSearch = async (name) => {
    if (filterValue === "All") {
      const URL_NAME = 'https://cr-pi-countries-baideweii.onrender.com/countries/name/?name=';
      // const URL_NAME = 'http://localhost:3001/countries/name/?name=';
      try {
        if (name.trim() === "") {
          setAllCountries(countries); 
          return;
        }

        const { data } = await axios.get(`${URL_NAME}${name}`);
        if (data.length > 0) {
          setAllCountries(data);
          setCurrentPage(1);
        } else {
          alert('No hay países con ese nombre');
          setSearchBarInput('');
          setAllCountries(countries);
        } 
      } catch (error) {
        alert(error.message);
      }
    } else {
      const searchedCountries = countries.filter(
        country => 
          country.name
            .toLowerCase()
            .includes(name.toLowerCase())
      );
      if (searchedCountries.length > 0) {
        setAllCountries(searchedCountries);
        setCurrentPage(1);
      } else {
        alert('No hay países con ese nombre');
        setSearchBarInput('');
        setAllCountries(countries);
      }
    }
  };

  const getActivityType = async (type) => {
    const URL_NAME = 'https://cr-pi-countries-baideweii.onrender.com/activities/';
    // const URL_NAME = 'http://localhost:3001/activities/';
    if (type === 'None') {
      setAllCountries(countries)
    } else {
      try {
        const { data } = await axios.get(`${URL_NAME}${type}`);
        if (data.length > 0) {
          setAllCountries(data);
          setCurrentPage(1);
        } else {
          alert('No hay países con ese tipo');
          setAllCountries(countries);
        } 
      } catch (error) {
        alert('No hay países con ese tipo');
        setAllCountries(countries);
      } 
    }
  }

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setSearchBarInput('');
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} searchBarInput={searchBarInput} setSearchBarInput={setSearchBarInput} />
      <Filters handleFilterChange={handleFilterChange} getActivityType={getActivityType} />
      <Link to="/activity">
        <button>Create Activity</button>
      </Link>
      <Cards countries={allCountries.slice(firstIndex, lastIndex)} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    countries: state.countries, 
  };
}

export default connect(mapStateToProps)(HomePage);
