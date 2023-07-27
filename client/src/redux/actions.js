import { GET_VG } from './types';
import axios from 'axios';


export const getVideogames = () => {
  const endpoint = 'http://localhost:3001/videogames'
  return async (dispatch) => {
    try {
      const {data} = await axios.get(endpoint);
    return dispatch({
      type: GET_VG,
      payload: data
    })
    } catch (error) {
      console.error(error);
    }
  }
}

