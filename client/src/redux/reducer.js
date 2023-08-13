import {
  GET_VG,
  ORDER_AND_FILTER_VIDEOGAMES,
  SEARCH_BY_NAME,
  SET_ORDER,
  SET_PAGE,
  SET_ORIGIN,
  SET_GENRE,
  SET_LOADING,
} from './types';
import validator from 'validator';

const initialState = {
  myVideogames: [],
  allVideogames: [],
  homeStatus: {
    page: 1,
    order: 'ascending',
    originFilter: 'all',
    genreFilter: 'all',
    loading: true,
  },
};

export const cardsReducer = (state = initialState, action) => {
  let resultArray = [];
  let typeOfId = '';
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        homeStatus: { ...state.homeStatus, page: action.payload },
      };

    case SET_ORDER:
      return {
        ...state,
        homeStatus: { ...state.homeStatus, order: action.payload },
      };

    case SET_ORIGIN:
      return {
        ...state,
        homeStatus: { ...state.homeStatus, originFilter: action.payload },
      };

    case SET_GENRE:
      return {
        ...state,
        homeStatus: { ...state.homeStatus, genreFilter: action.payload },
      };

    case GET_VG:
      return {
        ...state,
        myVideogames: action.payload,
        allVideogames: action.payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        myVideogames: action.payload,
      };

    case SET_LOADING:
      console.log(action.payload);
      return {
        ...state,
        homeStatus: { ...state.homeStatus, loading: action.payload },
      };
    


    case ORDER_AND_FILTER_VIDEOGAMES:
      // filtro por origen
      if (action.payload.originSelectValue === 'all') {
        resultArray = [...state.allVideogames];
        state.homeStatus.originFilter = 'all';
      } else {
        if (action.payload.originSelectValue === 'database') {
          typeOfId = true;
          state.homeStatus.originFilter = 'database';
        }
        if (action.payload.originSelectValue === 'api') {
          typeOfId = false;
          state.homeStatus.originFilter = 'api';
        }
        resultArray = [...state.allVideogames].filter((vg) => {
          return validator.isUUID(vg.id.toString()) === typeOfId;
        });
      }
      // filtro por genre
      if (action.payload.genreSelectValue !== 'all') {
        resultArray = resultArray.filter((vg) =>
          vg.Genres.some(
            (genre) => genre.id.toString() === action.payload.genreSelectValue
          )
        );
        state.homeStatus.genreFilter = action.payload.genreSelectValue;
      } else {
        state.homeStatus.genreFilter = 'all';
      }
      resultArray.sort((a, b) => {
        const comparisonResult =
          action.payload.orderSelectValue === 'ascending'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);

        if (comparisonResult !== 0) {
          state.homeStatus.order = action.payload.orderSelectValue;
        }

        return comparisonResult;
      });
      return {
        ...state,
        myVideogames: resultArray,
      };

    default:
      return { ...state };
  }
};
