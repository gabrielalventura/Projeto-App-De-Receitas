import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function CheckBoxIngredients(props) {
  const [done, setDone] = useState(false);
  const { ingredient, index, recipe } = props;
  const { inProgress, setInProgress } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const verifyProgress = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let result = false;
      if (Object.keys(recipe).includes('idMeal')
        && savedProgress.meals[recipe.idMeal] !== undefined) {
        result = savedProgress.meals[recipe.idMeal].some((element) => (
          element === ingredient
        ));
      }
      if (Object.keys(recipe).includes('idDrink')
        && savedProgress.drinks[recipe.idDrink] !== undefined) {
        result = savedProgress.drinks[recipe.idDrink].some((element) => (
          element === ingredient
        ));
      }
      setDone(result);
      setInProgress(savedProgress);
    }
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, '');
    setIsLoading(false);
  };

  useEffect(() => {
    verifyProgress();
  }, []);

  const removeItemMeal = async (id) => {
    await setInProgress({
      ...inProgress,
      meals: { ...inProgress.meals,
        [id]: inProgress.meals[id].filter((element) => (
          element !== ingredient
        )) },
    });
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newStorage = {
      drinks: storage.drinks,
      meals: { ...storage.meals,
        [id]: storage.meals[id].filter((element) => (
          element !== ingredient
        )) } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  const addItemMeal = async (id) => {
    if (inProgress.meals[id]) {
      setInProgress({
        ...inProgress,
        meals: { ...inProgress.meals, [id]: [...inProgress.meals[id], ingredient] },
      });
    } else {
      setInProgress({
        ...inProgress,
        meals: { ...inProgress.meals, [id]: [ingredient] },
      });
    }
  };

  const removeItemDrink = async (id) => {
    await setInProgress({
      ...inProgress,
      drinks: { ...inProgress.drinks,
        [id]: inProgress.drinks[id].filter((element) => (
          element !== ingredient
        )) },
    });
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newStorage = {
      meals: storage.meals,
      drinks: { ...storage.drinks,
        [id]: storage.drinks[id].filter((element) => (
          element !== ingredient
        )) } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  const addItemDrink = async (id) => {
    if (inProgress.drinks[id]) {
      setInProgress({
        ...inProgress,
        drinks: { ...inProgress.drinks, [id]: [...inProgress.drinks[id], ingredient] },
      });
    } else {
      setInProgress({
        ...inProgress,
        drinks: { ...inProgress.drinks, [id]: [ingredient] },
      });
    }
  };

  const handleChange = async () => {
    if (done) {
      if (Object.keys(recipe).includes('idMeal')) {
        removeItemMeal(recipe.idMeal);
      } else {
        removeItemDrink(recipe.idDrink);
      }
      setDone(false);
    } else {
      if (Object.keys(recipe).includes('idMeal')) {
        addItemMeal(recipe.idMeal);
      } else {
        addItemDrink(recipe.idDrink);
      }
      setDone(true);
    }
  };

  useEffect(() => {
    if (Object.keys(inProgress.meals).length > 0
      || Object.keys(inProgress.drinks).length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  }, [inProgress]);

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
              data-testid="ingredient-checkbox"
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
