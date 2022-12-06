import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CheckBoxIngredients from './CheckBoxIngredients';
import AppContext from '../context/AppContext';
import Share from './Share';

function MealInProgress(props) {
  const { recipe, ingredients } = props;
  const { inProgress, wasShared } = useContext(AppContext);
  const [able, setAble] = useState(false);

  const validateIngredients = () => {
    const doneSteps = inProgress.meals.filter((element) => (
      element.id === recipe[0].idMeal
    ));
    if (doneSteps.length === ingredients.length) {
      setAble(true);
    } else {
      setAble(false);
    }
  };

  useEffect(() => {
    validateIngredients();
  }, [inProgress]);

  const history = useHistory();

  const finishRecipe = () => {
    let newArray = [];
    let actualDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (actualDone === null) {
      actualDone = [];
    }
    const actualArray = [...actualDone];
    const alreadyDone = actualArray.some((element) => (
      element.idMeal === recipe[0].idMeal
    ));
    if (actualArray.length > 0 && !alreadyDone) {
      const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newArray = [...savedRecipes, recipe[0]];
    } else if (actualArray.length > 0 && alreadyDone) {
      const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newArray = [...savedRecipes];
    } else {
      newArray = [recipe[0]];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(newArray));
    history.push('/done-recipes');
  };

  return (
    <div>
      <img
        src={ recipe[0].strMealThumb }
        alt={ recipe[0].strMeal }
        data-testid="recipe-photo"
        className="card-image"
      />
      <h3 data-testid="recipe-title">{ recipe[0].strMeal }</h3>
      <Share
        index="0"
        type="meal"
        id={ recipe[0].idMeal }
        testid="share-btn"
      />
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <div>
        { wasShared && <p>Link copied!</p>}
      </div>
      <h4 data-testid="recipe-category">{ recipe[0].strCategory }</h4>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <CheckBoxIngredients
              recipe={ recipe[0] }
              key={ index }
              index={ index }
              ingredient={ ingredient }
            />
          ))
        }
      </ul>
      <p data-testid="instructions">{ recipe[0].strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !able }
        onClick={ finishRecipe }
      >
        Finish
      </button>
    </div>
  );
}

MealInProgress.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MealInProgress;
