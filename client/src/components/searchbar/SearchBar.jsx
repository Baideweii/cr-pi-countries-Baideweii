import React from 'react';
import './SearchBar.css';
import { validateSearch } from '../../validations/validation';

function SearchBar(props) {
    const { searchBarInput, setSearchBarInput, onSearch } = props;

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const validationError = validateSearch(inputValue);

        if (!validationError) { 
            setSearchBarInput(inputValue);
            onSearch(inputValue);
        }
    };

    return (
        <div className='searchbar'>
            <input type='search' onChange={handleChange} placeholder='Ingresa un nombre' value={searchBarInput}></input>
        </div>
    );
}

export default SearchBar;
