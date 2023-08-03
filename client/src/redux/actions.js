import { GET_VG, SEARCH_BY_NAME, ORDER_AND_FILTER_VIDEOGAMES} from './types';
import axios from 'axios';


export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/videogames');
    return dispatch({
      type: GET_VG,
      payload: data
    })
    } catch (error) {
      console.error(error);
    }
  }
}

export const searchByName = (search) => {
  return async (dispatch) => {
    try {
    return dispatch({
      type: SEARCH_BY_NAME,
      payload: search
    })
    } catch (error) {
      console.error(error);
    }
  }
}

export const orderAndFilterVideogames = (orderAndFilter) => {
  return async (dispatch) => {
    try {
    return dispatch({
      type: ORDER_AND_FILTER_VIDEOGAMES,
      payload: orderAndFilter
    })
    } catch (error) {
      console.error(error);
    }
  }
}

