import { handleErrors } from "./utilities.js"
import { fetchRecipe } from "./recipe.js"
import { fetchAllRecipeIds } from "./allRecipeIds.js"

import {
  FETCH_ALL_RECIPES_BEGIN,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE,
} from "../types.js"

export const fetchAllRecipesBegin = () => ({
  type: FETCH_ALL_RECIPES_BEGIN,
})

export const fetchAllRecipesSuccess = (allRecipes) => ({
  type: FETCH_ALL_RECIPES_SUCCESS,
  payload: { data: allRecipes },
})

export const fetchAllRecipesFailure = (error) => ({
  type: FETCH_ALL_RECIPES_FAILURE,
  payload: { error },
})

export const fetchAllRecipes = () => {
  return async (dispatch) => {
    dispatch(fetchAllRecipesBegin())
    try {
      const ids = await dispatch(fetchAllRecipeIds())
      const allRecipes = await Promise.all(
        ids.map(async (id) => {
          try {
            return await dispatch(fetchRecipe(id))
          } catch (error) {
            console.error(`Failed to fetch recipe with id ${id}:`, error)
            return null
          }
        })
      ).then((results) => results.filter((recipe) => recipe !== null))
      dispatch(fetchAllRecipesSuccess(allRecipes))
    } catch (error) {
      console.error(error)
      dispatch(fetchAllRecipesFailure(error.toString()))
    }
  }
}
