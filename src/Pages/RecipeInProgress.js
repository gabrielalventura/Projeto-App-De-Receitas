import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import mockMeals from '../helpers/mockMealInProgress';

function RecipeInProgress() {
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(true);
  let recipes = [];
  if (type === 'meals') {
    recipes = mockMeals;
  }
  // const { recipes } = useContext(AppContext);
  const history = useHistory();

  const getRecipeInfo = () => {
    const newRecipe = recipes.filter((re) => (
      re.idMeal === id
    ));
    setRecipe(newRecipe);
    setTimeout(() => {
      setLoading(false);
    }, '0');
  };

  useEffect(() => {
    getRecipeInfo();
  }, [id]);

  useEffect(() => {
    const { pathname } = history.location;
    const recipeId = pathname.split('/')[2];
    const recipeType = pathname.split('/')[1];
    setId(recipeId);
    setType(recipeType);
    // getRecipeInfo();
  }, []);

  return (
    <div>
      <h1>Recipe In Progress</h1>
      {
        isLoading
          ? <h3>Loading...</h3>
          : (
            <div>
              <img
                src={ recipe[0].strMealThumb }
                alt={ recipe[0].strMeal }
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">{ recipe[0].strMeal }</h3>
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <h4 data-testid="recipe-category">{ recipe[0].strCategory }</h4>
            </div>
          )
      }
    </div>
  );
}

export default RecipeInProgress;
