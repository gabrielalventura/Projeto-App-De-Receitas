import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function CheckBoxIngredients(props) {
  const [done, setDone] = useState(false);
  const { ingredient, index, recipe } = props;
  const { inProgress, setInProgress } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const verifyProgress = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let result = false;
      if (Object.keys(recipe).includes('idMeal')) {
        result = savedProgress.meals.some((element) => (
          element.id === recipe.idMeal && element.ingredient === ingredient
        ));
      }
      if (Object.keys(recipe).includes('idDrink')) {
        result = savedProgress.drinks.some((element) => (
          element.id === recipe.idDrink && element.ingredient === ingredient
        ));
      }
      setDone(result);
      setInProgress(savedProgress);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, '');
    // setIsLoading(false);
  };

  useEffect(() => {
    verifyProgress();
  }, []);

  const removeItemMeal = async (id) => {
    await setInProgress({
      ...inProgress,
      meals: inProgress.meals.filter((element) => (
        (element.id !== id)
        || (element.id === id && element.ingredient !== ingredient)
      )),
    });
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const addItemMeal = async (id) => {
    await setInProgress({
      ...inProgress,
      meals: [...inProgress.meals, { id, ingredient }],
    });
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const removeItemDrink = async (id) => {
    setInProgress({
      ...inProgress,
      drinks: inProgress.drinks.filter((element) => (
        (element.id !== id)
        || (element.id === id && element.ingredient !== ingredient)
      )),
    });
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const addItemDrink = (id) => {
    setInProgress({
      ...inProgress,
      drinks: [...inProgress.drinks, { id, ingredient }],
    });
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const handleChange = () => {
    if (done) {
      setDone(false);
      if (Object.keys(recipe).includes('idMeal')) {
        removeItemMeal(recipe.idMeal);
      } else {
        removeItemDrink(recipe.idDrink);
      }
    } else {
      setDone(true);
      if (Object.keys(recipe).includes('idMeal')) {
        addItemMeal(recipe.idMeal);
      } else {
        addItemDrink(recipe.idDrink);
      }
    }
  };

  useEffect(() => {
    if (inProgress.meals.length !== 0 && inProgress.drinks !== 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  }, [done]);

  return (
    <div>
      <label
        htmlFor={ `check-${ingredient}` }
        key={ index }
        className={ `ingredients-label-${done}` }
        data-testid={ `${index}-ingredient-step` }
      >
        {
          isLoading ? <p>loading</p> : (
            <input
              id={ `check-${ingredient}` }
              type="checkbox"
              className="ingredients-checkbox"
              onChange={ handleChange }
              checked={ done }
            />
          )
        }
        { ingredient }
      </label>
    </div>
  );
}

CheckBoxIngredients.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default CheckBoxIngredients;
