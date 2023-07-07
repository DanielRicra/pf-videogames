
import { ADD_REVIEW, SET_ERROR, SET_REVIEWS } from "./reviewAction";

const initialState = {
  reviews: [],
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        error: null,
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
