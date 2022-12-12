import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CheckBoxIngredients from './CheckBoxIngredients';
import AppContext from '../context/AppContext';
import Share from './Share';
import FavoriteButton from './FavoriteButton';

function MealInProgress(props) {
  const { recipe, ingredients } = props;
  // console.log(recipe)
  const { inProgress, wasShared } = useContext(AppContext);
  const [notAble, setNotAble] = useState(true);
  const {
    idMeal,
    strArea,
    strMeal,
    strCategory,
    strMealThumb,
    strTags,
  } = recipe[0];

  const validateIngredients = () => {
    const doneSteps = inProgress.meals.filter((element) => (
      element.id === recipe[0].idMeal
    ));
    if (doneSteps.length === ingredients.length && ingredients.length !== 0) {
      setNotAble(false);
    } else {
      setNotAble(true);
    }
  };
  useEffect(() => {
    validateIngredients();
  }, []);

  useEffect(() => {
    validateIngredients();
  }, [inProgress]);

  const history = useHistory();

  const finishRecipe = () => {
    const dateNow = new Date();
    let newTags = [];
    if (strTags !== null) {
      newTags = strTags.split(',');
    }
    const newRecipe = {
      id: idMeal,
      nationality: strArea,
      name: strMeal,
      category: strCategory,
      image: strMealThumb,
      tags: newTags,
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    };
    let newArray = [];
    let actualDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (actualDone === null) {
      actualDone = [];
    }
    const actualArray = [...actualDone];
    const alreadyDone = actualArray.some((element) => (
      element.id === recipe[0].idMeal
    ));
    if (actualArray.length > 0 && !alreadyDone) {
      const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newArray = [...savedRecipes, newRecipe];
    } else if (actualArray.length > 0 && alreadyDone) {
      const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newArray = [...savedRecipes];
    } else {
      newArray = [newRecipe];
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
      <FavoriteButton
        testid="favorite-btn"
        recipe={ recipe[0] }
        type="meal"
      />
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
        disabled={ notAble }
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
