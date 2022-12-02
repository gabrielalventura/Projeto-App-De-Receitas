import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import AppContext from '../context/AppContext';
import mockMeals from '../helpers/mockMealInProgress';
import mockDrink from '../helpers/mockDrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  // esse trecho deverá ser refatorado para receber a receita da página de detalhes
  let recipes = [];
  if (type === 'meals') {
    recipes = mockMeals;
  }
  if (type === 'drinks') {
    recipes = mockDrink;
  }
  // deverá ser obtido após clicar no start recipe da página de detalhes
  // const { recipes } = useContext(AppContext);
  const history = useHistory();

  const getRecipeInfo = () => {
    if (type === 'meals') {
      const newRecipe = recipes.filter((re) => (
        re.idMeal === id
      ));
      setRecipe(newRecipe);
      setTimeout(() => {
        setLoading(false);
      }, '');
    }
    if (type === 'drinks') {
      const newRecipe = recipes.filter((re) => (
        re.idDrink === id
      ));
      setRecipe(newRecipe);
      setTimeout(() => {
        setLoading(false);
      }, '');
    }
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
