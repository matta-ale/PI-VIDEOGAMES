import { GET_VG, ORDER_AND_FILTER_VIDEOGAMES, SEARCH_BY_NAME } from './types';
import validator from 'validator';

const initialState = {
  myVideogames: [],
  allVideogames: [],
};

export const cardsReducer = (state = initialState, action) => {
  let resultArray = [];
  let auxArray1 = [];
  let typeOfId = ''
  switch (action.type) {
    case GET_VG:
      return {
        ...state,
        myVideogames: action.payload,
        allVideogames: action.payload,
      };

    case SEARCH_BY_NAME:
      resultArray = state.allVideogames.filter(
        (vg) => vg.name.toLowerCase() === action.payload.toLowerCase()
      );
      return {
        ...state,
        myVideogames: resultArray,
      };

    case ORDER_AND_FILTER_VIDEOGAMES:
      // filtro por origen
      if (action.payload.originSelectValue === 'all') {
        resultArray = [...state.allVideogames]
      } else {
        if(action.payload.originSelectValue==='database') typeOfId = true
        if(action.payload.originSelectValue==='api') typeOfId = false 
        resultArray = [...state.allVideogames].filter((vg) => {
          return validator.isUUID(vg.id.toString()) === typeOfId;
        });
      }
      // filtro por genre 
      if (action.payload.genreSelectValue !== 'all') {
        resultArray = resultArray.filter((vg) =>
        vg.Genres.some((genre) => genre.id.toString() === action.payload.genreSelectValue)
        );
      }
      auxArray1 = [...resultArray]
      console.log(auxArray1);
      resultArray.sort((a, b) => {
        return action.payload.orderSelectValue === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
      });
      console.log(resultArray);
      return {
        ...state,
        myVideogames: resultArray,
      };

    default:
      return { ...state };
  }
};
