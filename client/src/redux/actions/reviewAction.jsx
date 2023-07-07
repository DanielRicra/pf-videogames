import axios from "axios";

// Acción para crear una nueva reseña
export const postReview = (review) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:3001/review", review);
        const newReview = response.data;
        dispatch({ type: "ADD_REVIEW", payload: newReview });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.response.data.message });
      }
    };
  };
