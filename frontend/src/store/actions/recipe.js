import {
  FETCH_RECIPE_BEGIN,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
} from "../types"

import { handleErrors } from "./utilities"

export const fetchRecipeBegin = () => ({
  type: FETCH_RECIPE_BEGIN,
})

export const fetchRecipeSuccess = (recipe) => ({
  type: FETCH_RECIPE_SUCCESS,
  payload: { data: recipe },
})

export const fetchRecipeFailure = (error) => ({
  type: FETCH_RECIPE_FAILURE,
  payload: { error },
})

export function fetchRecipe(id) {
  return async (dispatch) => {
    dispatch(fetchRecipeBegin())
    try {
      const response = await fetch(`/api/recipe/${id}`)
      const data = await response.json()
      dispatch(fetchRecipeSuccess(data))
      return data
    } catch (error) {
      dispatch(fetchRecipeFailure(error))
    }
  }
}
