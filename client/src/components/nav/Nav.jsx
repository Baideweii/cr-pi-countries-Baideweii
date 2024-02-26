import React from 'react'
import SearchBar from '../searchbar/SearchBar';
import Filters from '../filters/Filters';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav(props) {
  const { onSearch, searchBarInput, setSearchBarInput, handleFilterChange, getActivityType } = props;
  return (
    <nav className="nav_">
      <SearchBar onSearch={onSearch} searchBarInput={searchBarInput} setSearchBarInput={setSearchBarInput}/>
      <Filters handleFilterChange={handleFilterChange} getActivityType={getActivityType}/>
      <Link to="/activity">
        <button>Crear Actividad</button>
      </Link>
    </nav>
  )
}

export default Nav
