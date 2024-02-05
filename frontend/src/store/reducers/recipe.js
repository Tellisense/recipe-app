import {
  FETCH_RECIPE_BEGIN,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
} from "../types"

const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }

    case FETCH_RECIPE_FAILURE:
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
