import { combineReducers } from "redux"
import search from "./search"
import recipe from "./recipe"
import allRecipeIds from "./allRecipeIds"
import allRecipes from "./allRecipes"

export default combineReducers({ search, recipe, allRecipes, allRecipeIds })
