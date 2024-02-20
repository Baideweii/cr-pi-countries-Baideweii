import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const { searchBarInput, setSearchBarInput, onSearch } = props;

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (/^[a-zA-Z]*$/.test(inputValue) || inputValue === "") {
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
