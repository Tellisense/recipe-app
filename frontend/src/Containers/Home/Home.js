import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../store/actions"
import { fetchAllRecipes } from "../../store/actions/allRecipes"
import { performSearch } from "../../store/actions/search"
import { Link } from "react-router-dom"

import * as Styles from "./Home.styles"
const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

export const Home = () => {
  const [term, setTerm] = useState("")
  const [ingredients, setIngredients] = useState([])
  const dispatch = useDispatch()

  console.log(
    `REDUX STORE: `,
    useSelector((state) => state)
  )

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useSelector((state) => state.search)

  const {
    data: allRecipesData,
    loading: allRecipesLoading,
    error: allRecipesError,
  } = useSelector((state) => state.allRecipes)

  console.log(`home page data: `, {
    term,
    ingredients,
    allRecipesData,
    searchData,
  })

  useEffect(() => {
    dispatch(fetchAllRecipes())
  }, [dispatch])

  const handleSearch = useCallback((event) => {
    setTerm(event.target.value)
  }, [])

  const handleIngredient = useCallback((ingredient, event) => {
    setIngredients((currentIngredients) => {
      if (event.target.checked) {
        return [...currentIngredients, ingredient]
      } else {
        return currentIngredients.filter((item) => item !== ingredient)
      }
    })
  }, [])

  const fetchSearch = async () => {
    try {
      await dispatch(performSearch({ term, ingredients }))
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
  }

  return (
    <Styles.HomeWrapper>
      <Input
        autoFocus={true}
        fullWidth={true}
        onChange={handleSearch}
        value={term}
      />
      <div>
        <h3>Ingredients on hand</h3>
        {ingredientList.map((ingredient, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={(event) => handleIngredient(ingredient, event)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button onClick={fetchSearch}>search</Button>
      <Divider />

      <Styles.Container>
        {searchLoading ? (
          <LinearProgress />
        ) : searchData?.data.length > 0 ? (
          <Styles.CardContainer>
            {searchData.data && (
              <List>
                {searchData.data.map((recipe, index) => (
                  <ListItem key={recipe._id}>
                    <Link to={`/recipe/${recipe._id}`}>
                      <Styles.Wrapper>
                        <Styles.Number>{`${index + 1}.`}</Styles.Number>
                        <ListItemText primary={recipe.name} />
                      </Styles.Wrapper>
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </Styles.CardContainer>
        ) : (
          <Styles.CardContainer>
            {allRecipesData && (
              <List>
                {allRecipesData.map((recipe, index) => (
                  <ListItem key={recipe._id}>
                    <Link to={`/recipe/${recipe._id}`}>
                      <Styles.Wrapper>
                        <Styles.Number>{`${index + 1}.`}</Styles.Number>
                        <ListItemText primary={recipe.name} />
                      </Styles.Wrapper>
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </Styles.CardContainer>
        )}
      </Styles.Container>

      {allRecipesLoading && <LinearProgress />}
      <Divider />
    </Styles.HomeWrapper>
  )
}
