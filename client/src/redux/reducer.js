import { UPLOAD, FILTER, ORDER, TYPES } from './actions';

const initialState = {
  //countries es el que se despliega en Home
  countries: [],

  //countriesByActivities es el que se llena cuando se usa el filtro por tipo de actividades
  countriesByActivities: [],

  //allCountries es un respaldo que tiene a todas las countries sin cambios y no se cambia nunca
  allCountries: [],

  //Estos son los valores de los filtros, para que se muestren a pesar de cambiar de pagina y los otros filtros tambien hagan uso de ellos
  filter: 'All',
  order: 'None',
  type: 'None',
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
        countries: getFilteredAndOrderedCountries(state.countries, state.allCountries, payload, state.order, state.type, state.countriesByActivities),
      };
    case ORDER:
      return {
        ...state,
        order: payload,
        countries: getFilteredAndOrderedCountries(state.countries, state.allCountries, state.filter, payload, state.type, state.countriesByActivities),
      };
    case TYPES:
      return {
        ...state,

        //recibe el tipo
        type: payload.type,

        //recibe las countries por el tipo de actividad seleccionado
        countriesByActivities: payload.countriesByType,

        //llama a la funcion y cambia las countries renderizadas
        countries: getFilteredAndOrderedCountries(payload.countriesByType, state.allCountries, state.filter, state.order, payload.type, payload.countriesByType)
      }
    default:
      return state;
  }
}

function getFilteredAndOrderedCountries(countries, allCountries, filter, order, type, countriesActivities) {
  let filteredCountries = []

  if(type === 'None') {
    //Si no hay filtro de tipo de actividad, llama a todas las countries
    filteredCountries = [...allCountries]
  } else if (countriesActivities.length > countries.length) {
    //Esto es en caso de haber cambiado los otros filtros teniendo una actividad seleccionada. De esta forma pregunta si countries actualmente ya esta filtrado, y si lo esta, agarra countriesActivities que son las countries del tipo seleccionado sin haber sido filtradas
    filteredCountries = [...countriesActivities]
  } else  {
    //Y si no agarra las countries del estado global o las del payload en caso de TYPES
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

  return filteredCountries;
}

export default reducer;
