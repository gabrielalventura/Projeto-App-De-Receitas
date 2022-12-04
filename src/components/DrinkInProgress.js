import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBoxIngredients from './CheckBoxIngredients';
import AppContext from '../context/AppContext';

function DrinkInProgress(props) {
  const { recipe, ingredients } = props;
  const { inProgress } = useContext(AppContext);
  const [able, setAble] = useState(false);

  const validateIngredients = () => {
    const doneSteps = inProgress.drinks.filter((element) => (
      element.id === recipe[0].idDrink
    ));
    if (doneSteps.length === ingredients.length) {
      console.log('All Done');
      setAble(true);
    } else {
      setAble(false);
    }
  };

  useEffect(() => {
    validateIngredients();
  }, [inProgress]);

  return (
    <div>
      <img
        src={ recipe[0].strDrinkThumb }
        alt={ recipe[0].strDrink }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ recipe[0].strDrink }</h3>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h4 data-testid="recipe-category">{ recipe[0].strCategory }</h4>
      <p>{ recipe[0].strAlcoholic }</p>
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
      >
        Finish
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DrinkInProgress;
