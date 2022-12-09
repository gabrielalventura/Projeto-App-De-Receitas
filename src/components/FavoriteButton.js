import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const [icon, setIcon] = useState(blackHeart);
  const [data, setData] = useState({});
  const {
    recipe,
    testid,
    type,
  } = props;
  // { id, type, nationality, category, alcoholicOrNot, name, image }

  const validateFavorite = () => {
    let result = false;
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      result = savedRecipes.some((element) => element.idRecipe === data.idRecipe);
    }
    if (result) {
      setIcon(blackHeart);
    } else {
      setIcon(whiteHeart);
    }
  };

  const getData = () => {
    if (type === 'meal') {
      setData({
        id: recipe.idMeal,
        nationality: recipe.strArea,
        name: recipe.strMeal,
        category: recipe.strCategory,
        image: recipe.strMealThumb,
        alcoholicOrNot: '',
        type,
      });
    } else {
      setData({
        id: recipe.idDrink,
        nationality: '',
        name: recipe.strDrink,
        category: recipe.strCategory,
        image: recipe.strDrinkThumb,
        alcoholicOrNot: recipe.strAlcoholic,
        type,
      });
    }
    validateFavorite();
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    let result = false;
    let savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(savedRecipes);
    if (savedRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([data]));
      validateFavorite();
      savedRecipes = [data];
      console.log(savedRecipes);
    } else {
      result = savedRecipes.some((element) => element.idRecipe === data.idRecipe);
      if (savedRecipes !== null) {
        if (!result) {
          const newArray = [...savedRecipes, data];
          localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
          validateFavorite();
        } else {
          const newArray = savedRecipes.filter((element) => (
            element.idRecipe !== data.idRecipe
          ));
          localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
          validateFavorite();
        }
      }
    }
  };

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="icon-containers"
      data-testid="icon-container"
    >
      <img
        src={ icon }
        alt="favorite"
        data-testid={ testid }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({}),
  testid: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default FavoriteButton;
