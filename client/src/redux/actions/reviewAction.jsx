import { getReviewByVideogameId, saveReview } from '../../services/reviewService'

export const ADD_REVIEW = 'ADD_REVIEW'
export const SET_ERROR = 'SET_ERROR'
export const SET_REVIEWS = 'SET_REVIEWS'

export const postReview = (review) => {
  return async (dispatch) => {
    try {
      const newReview = await saveReview(review)
      dispatch({ type: ADD_REVIEW, payload: newReview })
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message })
    }
  }
}

export const fetchReviews = (videogameId) => {
  return async (dispatch) => {
    try {
      const reviews = await getReviewByVideogameId(videogameId)
      dispatch({ type: SET_REVIEWS, payload: reviews })
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message })
    }
  }
}
