export const FILTER = 'FILTER'
export const UPLOAD = 'UPLOAD'
export const ORDER = 'ORDER'

export const filterCountries = (continent) => ({type: FILTER, payload: continent})
export const updateCountries = (countries) => ({type: UPLOAD, payload: countries});
export const orderCountries = (order) => ({type: ORDER, payload: order})
