import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const [type, setType] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const fetchRecipe = async (recipeId, recipeType) => {
    let recipes = [];
    if (recipeType === 'drinks') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      recipes = drinks;
      setRecipe(recipes);
      setLoading(false);
    }
    if (recipeType === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      recipes = meals;
      setRecipe(recipes);
      setLoading(false);
    }
  };

  useEffect(() => {
    const { pathname } = history.location;
    const recipeId = pathname.split('/')[2];
    const recipeType = pathname.split('/')[1];
    setType(recipeType);
    fetchRecipe(recipeId, recipeType);
  }, []);

  const getIngredientsList = () => {
    const ingredientsArray = [];
    const measuresArray = [];
    const concatenatedArray = [];
    if (recipe && recipe.length > 0) {
      const entries = Object.entries(recipe[0]);
      for (let index = 0; index < entries.length; index += 1) {
        if (entries[index][0].includes('Ingredient')
        && entries[index][1] !== null && entries[index][1].length > 0) {
          ingredientsArray.push(entries[index][1]);
        }
      }
      for (let index = 0; index < entries.length; index += 1) {
        if (entries[index][0].includes('Measure')
        && entries[index][1] !== null && entries[index][1].length > 0) {
          measuresArray.push(entries[index][1]);
        }
      }
      ingredientsArray.forEach((element, index) => {
        concatenatedArray.push(`${measuresArray[index]} ${element}`);
      });
      setIngredients(concatenatedArray);
    }
  };

  useEffect(() => {
    getIngredientsList();
  }, [recipe]);

  const renderComponent = () => (type === 'meals' ? (
    <MealInProgress recipe={ recipe } ingredients={ ingredients } />
  )
    : (
      <DrinkInProgress recipe={ recipe } ingredients={ ingredients } />
    ));

  return (
    <div>
      <h1>Recipe In Progress</h1>
      {
        isLoading
          ? <h3>Loading...</h3>
          : (
            renderComponent()
          )
      }
    </div>
  );
}

export default RecipeInProgress;
