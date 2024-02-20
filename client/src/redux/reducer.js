import { UPLOAD, FILTER, ORDER } from './actions';

const initialState = {
  countries: [],
  allCountries: [],
  filter: 'All',
  order: 'None',
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPLOAD:
      console.log("Received countries:", payload); 
      return {
        ...state,
        countries: payload,
        allCountries: payload,
      };
    case FILTER:
      return {
        ...state,
        filter: payload,
        countries: getFilteredAndOrderedCountries(state.allCountries, payload, state.order),
      };
    case ORDER:
      return {
        ...state,
        order: payload,
        countries: getFilteredAndOrderedCountries(state.allCountries, state.filter, payload),
      };
    default:
      return state;
  }
}

function getFilteredAndOrderedCountries(countries, filter, order) {
  let filteredCountries = [...countries]; 
  
  if (filter !== 'All') {
    filteredCountries = filteredCountries.filter(country => country.continent === filter);
  }

  if (order === 'ME') {
    filteredCountries.sort((a, b) => a.poblation - b.poblation);
  } else if (order === 'MA') {
    filteredCountries.sort((a, b) => b.poblation - a.poblation);
  } else if (order === 'Z') {
    filteredCountries.sort((a, b) => b.name.localeCompare(a.name));
  } else if (order === 'A') {
    filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filteredCountries;
}

export default reducer;
