import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { converStrToId } from './HelperRecipesDetails';
import '../../styles/RecomendedRecipes.css';
import Share from '../Share';
import FavoriteButton from '../../Pages/FavoriteButton';

function RecipesDetails({ history }) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [recomended, setRecomended] = useState([]);
  const urlInclude = converStrToId(history.location.pathname);
  const dataContext = useContext(AppContext);

  useEffect(() => {
    const drinksOrMeals = async () => {
      const six = 6;
      try {
        if (history.location.pathname.includes('drink')) {
          const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          const jsonMeals = await responseMeals.json();
          console.log(jsonMeals);
          const sJsonMeals = jsonMeals.meals.slice(0, six);
          return setRecomended(sJsonMeals);
        }
        if (history.location.pathname.includes('meal')) {
          const respondeDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
          const jsonDrinks = await respondeDrinks.json();
          const sJsonDrinks = jsonDrinks.drinks.slice(0, six);
          return setRecomended(sJsonDrinks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    drinksOrMeals();
  }, [history.location.pathname]);

  useEffect(() => {
    async function fetchDrinksOrFoods() {
      if (history.location.pathname.includes('drink')) {
        const responseDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlInclude}`);
        const jsonDrink = await responseDrink.json();
        const filterIngredients = Object.keys(jsonDrink.drinks[0])
          .filter((drink) => drink.includes('strIngredient')) || [];
        const filterMeasures = Object.keys(jsonDrink.drinks[0])
          .filter((drink) => drink.includes('strMeasure')) || [];
        const categoryAlcoholic = `${jsonDrink.drinks[0].strAlcoholic}
        ${jsonDrink.drinks[0].strCategory}`;
        const objectFinnaly = {
          json: jsonDrink,
          drinks: true,
          title: jsonDrink.drinks[0].strDrink,
          thumb: jsonDrink.drinks[0].strDrinkThumb,
          category: categoryAlcoholic,
          instructions: jsonDrink.drinks[0].strInstructions,
          ingredients: filterIngredients
            .map((ingredient) => jsonDrink.drinks[0][ingredient]),
          measures: filterMeasures.map((measure) => jsonDrink.drinks[0][measure]),
          id: jsonDrink.drinks[0].idDrink,
          alcoholic: jsonDrink.drinks[0].strAlcoholic,
          simpleCategory: jsonDrink.drinks[0].strCategory,
        };
        return setSelectedCategory(objectFinnaly);
      }
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlInclude}`);
      const json = await response.json();

      const filterIngredients = Object.keys(json.meals[0])
        .filter((meal) => meal.includes('strIngredient')) || [];

      const filterMeasures = Object.keys(json.meals[0])
        .filter((meal) => meal.includes('strMeasure')) || [];
      const objectFinnaly = {
        json,
        meals: true,
        linkYtb: json.meals[0].strYoutube,
        title: json.meals[0].strMeal,
        thumb: json.meals[0].strMealThumb,
        category: json.meals[0].strCategory,
        instructions: json.meals[0].strInstructions,
        ingredients: filterIngredients.map((ingredient) => json.meals[0][ingredient]),
        measures: filterMeasures.map((measure) => json.meals[0][measure]),
        id: json.meals[0].idMeal,
      };
      return setSelectedCategory(objectFinnaly);
    }
    fetchDrinksOrFoods();
  }, [
    history.location.pathname,
    urlInclude,
    dataContext.fetchDrinks,
    dataContext.fetchMeals,
  ]);

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
        onClick={ async () => {
          if (history.location.pathname.includes('meal')) {
            await dataContext.setRecipesInProgress([selectedCategory]);
            history.push(`/meals/${selectedCategory.id}/in-progress`);
          } else {
            await dataContext.setRecipesInProgress([selectedCategory]);
            history.push(`/drinks/${selectedCategory.id}/in-progress`);
          }
        } }
      >
        Start Recipe
      </button>
      {history.location.pathname.includes('drink')
        && selectedCategory.json !== undefined ? (
          <>
            <Share
              type="drink"
              id={ selectedCategory.id }
              testid="share-btn"
            />
            {/* <FavoriteButton
              type="drink"
              recipe={ selectedCategory.jsonDrink.drinks[0] }
              testid="favorite-btn"
            /> */}
          </>
        ) : (
          <>
            <Share
              type="meal"
              id={ selectedCategory.id }
              testid="share-btn"
            />
            {/* <FavoriteButton
              type="meal"
              recipe={ selectedCategory.json.meals[0] }
              testid="favorite-btn"
            /> */}
          </>
        )}
      <div>
        { dataContext.wasShared && <p>Link copied!</p>}
      </div>
      <div className="containerRecomended">
        {
          history.location.pathname.includes('meal')
            && recomended.length > 0
            && recomended[0].strDrinkThumb && (
            recomended.map((element, index) => (
              <div key={ index } data-testid={ `${index}-recommendation-card` }>
                <img
                  src={ element.strDrinkThumb }
                  alt={ element.strDrink }
                  className="imgRecomended"
                />
                <p data-testid={ `${index}-recommendation-title` }>{element.strDrink}</p>
              </div>
            ))
          )
        }
        {
          history.location.pathname.includes('drink')
            && recomended.length > 0
            && recomended[0].strMealThumb && (
            recomended.map((element, index) => (
              <div key={ index } data-testid={ `${index}-recommendation-card` }>
                <img
                  src={ element.strMealThumb }
                  alt={ element.strMeal }
                  className="imgRecomended"
                />
                <p data-testid={ `${index}-recommendation-title` }>{element.strMeal}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

RecipesDetails.propTypes = ({
  history: PropTypes.objectOf(Object),
}).isRequired;

export default RecipesDetails;
