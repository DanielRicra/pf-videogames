import axios from "axios";

export const ADD_REVIEW = "ADD_REVIEW";
export const SET_ERROR = "SET_ERROR";
export const SET_REVIEWS = "SET_REVIEWS";

export const postReview = (review) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/review", review);
      const newReview = response.data;
      dispatch({ type: ADD_REVIEW, payload: newReview });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message });
    }
  };
};

export const fetchReviews = (videogameId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/review/videogame/${videogameId}`);
      const reviews = response.data;
      dispatch({ type: SET_REVIEWS, payload: reviews });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message });
    }
  };
};
