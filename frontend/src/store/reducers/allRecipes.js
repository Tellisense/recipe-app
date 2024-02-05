import {
  FETCH_ALL_RECIPES_BEGIN,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE,
} from "../types"

const initialState = {
  data: [],
  loading: false,
  error: null,
}

function allRecipesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_RECIPES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }

    case FETCH_ALL_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      }

    default:
      return state
  }
}

export default allRecipesReducer
