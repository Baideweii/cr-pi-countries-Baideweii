import { UPLOAD, FILTER, ORDER, TYPES, AREA } from './actions';

const initialState = {
  countries: [],
  countriesByActivities: [],
  allCountries: [],
  filter: 'All',
  order: 'None',
  type: 'None',
  area: 'None',
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
        countries: getFilteredAndOrderedCountries(state.countries, state.allCountries, payload, state.order, state.type, state.countriesByActivities, state.area),
      };
    case ORDER:
      return {
        ...state,
        order: payload,
        countries: getFilteredAndOrderedCountries(state.countries, state.allCountries, state.filter, payload, state.type, state.countriesByActivities, state.area),
      };
    case TYPES:
      return {
        ...state,
        type: payload.type,
        countriesByActivities: payload.countriesByType,
        countries: getFilteredAndOrderedCountries(payload.countriesByType, state.allCountries, state.filter, state.order, payload.type, payload.countriesByType, state.area)
      }
    case AREA:
      return {
        ...state,
        area: payload,
        countries: getFilteredAndOrderedCountries(state.countries, state.allCountries, state.filter, state.order, state.type, state.countriesByActivities, payload)
      }
    default:
      return state;
  }
}

function getFilteredAndOrderedCountries(countries, allCountries, filter, order, type, countriesActivities, area) {
  let filteredCountries = []

  if(type === 'None') {
    filteredCountries = [...allCountries]
  } else if (countriesActivities.length > countries.length) {
    filteredCountries = [...countriesActivities]
  } else  {
    filteredCountries = [...countries]
  }

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

  if(area === 'ME') {
    filteredCountries = filteredCountries.filter(country => country.area < 900000)
  } else if (area === 'MA') {
    filteredCountries = filteredCountries.filter(country => country.area > 900000)
  }

  

  return filteredCountries;
}

export default reducer;
