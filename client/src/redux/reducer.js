import { GET_VG } from './types';

const initialState = {
  myVideogames: [],
  allVideogames: [],
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VG:
      return {
        ...state,
        myVideogames: action.payload,
        allVideogames: action.payload,
      };

    default:
      return { ...state };
  }
};
