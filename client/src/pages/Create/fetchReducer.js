export const actionTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
}
export const INITIAL_STATE = {
  data: {},
  loading: false,
  error: null,
}

export const saveNewVideogame = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
