import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { converStrToId } from './HelperRecipesDetails';

function RecipesDetails({ history }) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const urlInclude = converStrToId(history.location.pathname);
  const { fetchDrinks, fetchMeals } = useContext(AppContext);

  useEffect(() => {
    async function fetchDrinksOrFoods() {
      if (history.location.pathname.includes('drink')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlInclude}`);
        const json = await response.json();
        const filterIngredients = Object.keys(json.drinks[0])
          .filter((drink) => drink.includes('strIngredient')) || [];
        const filterMeasures = Object.keys(json.drinks[0])
          .filter((drink) => drink.includes('strMeasure')) || [];
        const categoryAlcoholic = `${json.drinks[0].strAlcoholic}
        ${json.drinks[0].strCategory}`;

        const objectFinnaly = {
          title: json.drinks[0].strDrink,
          thumb: json.drinks[0].strDrinkThumb,
          category: categoryAlcoholic,
          instructions: json.drinks[0].strInstructions,
          ingredients: filterIngredients.map((ingredient) => json.drinks[0][ingredient]),
          measures: filterMeasures.map((measure) => json.drinks[0][measure]),
          drinkOrFood: fetchDrinks,
        };
        setSelectedCategory(objectFinnaly);
      } else if (history.location.pathname.includes('meal')) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlInclude}`);
        const json = await response.json();

        const filterIngredients = Object.keys(json.meals[0])
          .filter((meal) => meal.includes('strIngredient')) || [];

        const filterMeasures = Object.keys(json.meals[0])
          .filter((meal) => meal.includes('strMeasure')) || [];

        const objectFinnaly = {
          linkYtb: json.meals[0].strYoutube,
          title: json.meals[0].strMeal,
          thumb: json.meals[0].strMealThumb,
          category: json.meals[0].strCategory,
          instructions: json.meals[0].strInstructions,
          ingredients: filterIngredients.map((ingredient) => json.meals[0][ingredient]),
          measures: filterMeasures.map((measure) => json.meals[0][measure]),
          drinkOrFood: fetchMeals,
        };
        setSelectedCategory(objectFinnaly);
      }
    }
    fetchDrinksOrFoods();
  }, [history.location.pathname, urlInclude, fetchDrinks, fetchMeals]);

  return (
    <div>
      <h2 data-testid="recipe-title">{selectedCategory.title}</h2>
      <img
        src={ selectedCategory.thumb }
        alt={ selectedCategory.title }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">
        {selectedCategory.category}
      </p>
      <ul>
        {selectedCategory.ingredients && selectedCategory.ingredients
          .map((ingredient, index) => {
            if (ingredient !== null && ingredient.length > 0) {
              return (
                <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {ingredient}
                  {' of '}
                  {selectedCategory.measures[index]}
                </li>
              );
            }
            return '';
          })}
      </ul>
      <p data-testid="instructions">
        {
          selectedCategory.instructions
        }
      </p>
      <iframe
        height="480"
        width="500"
        title={ `Video de instrução para o prato ${selectedCategory.title}` }
        src={ selectedCategory.linkYtb }
        data-testid="video"
      />
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
      >
        Start Recipe
      </button>
    </div>
  );
}

RecipesDetails.propTypes = ({
  history: PropTypes.objectOf(Object),
}).isRequired;

export default RecipesDetails;
