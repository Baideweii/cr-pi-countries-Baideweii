import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Cards from '../cards/Cards';
import Pagination from '../pagination/Pagination';
import axios from "axios";
import URLS from '../../helpers/urlHelper';
import { filterByTypes } from '../../redux/actions';
import Nav from '../nav/Nav';

function HomePage({ countries }) {
  const [allCountries, setAllCountries] = useState(countries);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10

  const [searchBarInput, setSearchBarInput] = useState('');
  
  const [filterValue, setFilterValue] = useState("All");

  const dispatch = useDispatch()

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
      const URL_NAME = `${URLS.theUrl}/countries/name/?name=`;
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
    const URL_NAME = `${URLS.theUrl}/activities`;
    if (type === 'None') {
      dispatch(filterByTypes(type, countries));
      setCurrentPage(1);
    } else {
      try {
        const { data } = await axios.get(`${URL_NAME}/${type}`);
        if (data.length > 0) {
          dispatch(filterByTypes(type, data))
          setCurrentPage(1);
        } else {
          alert('No hay países con ese tipo');
          setAllCountries(countries);
        } 
      } catch (error) {
        alert('No hay países con ese tipo');
        dispatch(filterByTypes('None', countries));
        setCurrentPage(1);
      } 
    }
  }

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setSearchBarInput('');
  };

  return (
    <div>
      <Nav
        onSearch={onSearch}
        searchBarInput={searchBarInput}
        setSearchBarInput={setSearchBarInput}
        handleFilterChange={handleFilterChange}
        getActivityType={getActivityType}
        />
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
