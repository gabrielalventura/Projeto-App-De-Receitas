import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxIngredients from './CheckBoxIngredients';

function MealInProgress(props) {
  const { recipe, ingredients } = props;
  return (
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
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <CheckBoxIngredients
              key={ index }
              index={ index }
              ingredient={ ingredient }
            />
          ))
        }
      </ul>
      <p data-testid="instructions">{ recipe[0].strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

MealInProgress.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MealInProgress;
