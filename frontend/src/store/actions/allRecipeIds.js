import {
  FETCH_ALL_RECIPE_IDS_BEGIN,
  FETCH_ALL_RECIPE_IDS_SUCCESS,
  FETCH_ALL_RECIPE_IDS_FAILURE,
} from "../types.js"

import { handleErrors } from "./utilities.js"
import { fetchRecipe } from "./recipe.js"

const ALL_RECIPE_ID_ROUTE = `/api/allrecipesIds`

export const fetchAllRecipeIdsBegin = () => ({
  type: FETCH_ALL_RECIPE_IDS_BEGIN,
})

export const fetchAllRecipeIdsSuccess = (ids) => ({
  type: FETCH_ALL_RECIPE_IDS_SUCCESS,
  payload: { data: ids },
})

export const fetchAllRecipeIdsFailure = (error) => ({
  type: FETCH_ALL_RECIPE_IDS_FAILURE,
  payload: { error },
})

export const fetchAllRecipeIds = () => {
  return async (dispatch) => {
    dispatch(fetchAllRecipeIdsBegin())
    try {
      const response = await fetch(ALL_RECIPE_ID_ROUTE)
      handleErrors(response)

      const ids = await response.json()
      dispatch(fetchAllRecipeIdsSuccess(ids))
      return ids
    } catch (error) {
      console.error("Failed to fetch recipe IDs:", error)
      dispatch(fetchAllRecipeIdsFailure(error.toString()))
    }
  }
}
