import {
  GET_VG,
  SEARCH_BY_NAME,
  ORDER_AND_FILTER_VIDEOGAMES,
  SET_PAGE,
  SET_ORDER,
  SET_ORIGIN,
  SET_GENRE,
  SET_LOADING,
  SET_FIRST_RENDER
} from './types';
import axios from 'axios';

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/videogames');
      return dispatch({
        type: GET_VG,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchByName = (search) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/videogames/name', { params: {name:search} });
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: data,
      });
    } catch (error) {
      window.alert(error.response.data);
    }
  };
};

export const orderAndFilterVideogames = (orderAndFilter) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ORDER_AND_FILTER_VIDEOGAMES,
        payload: orderAndFilter,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setPage = (page) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_PAGE,
        payload: page,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setOrder = (criteria) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_ORDER,
        payload: criteria,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setOrigin = (value) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_ORIGIN,
        payload: value,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setGenre = (value) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_GENRE,
        payload: value,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setLoading = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_LOADING,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setFirstRender = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_FIRST_RENDER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

