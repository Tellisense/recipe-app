// TODO Create a connected component to render a fetched recipe
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../../actions/recipe';

const Recipe = ({ recipeData, fetchRecipe, match }) => {
  useEffect(() => {
    // Assuming the recipe ID is passed via route params
    const recipeId = match.params.id;
    fetchRecipe(recipeId);
  }, [fetchRecipe, match.params.id]);

  if (recipeData.loading) {
    return <div>Loading...</div>;
  }

  if (recipeData.error) {
    return <div>Error: {recipeData.error}</div>;
  }

  return (
    <div>
      <h2>{recipeData.items.title}</h2>
      <p>{recipeData.items.description}</p>
      {/* Render other recipe details here */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipeData: state.recipe,
});

const mapDispatchToProps = {
  fetchRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);