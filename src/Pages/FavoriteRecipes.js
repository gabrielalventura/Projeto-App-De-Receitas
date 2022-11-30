// import React, { useState, useEffect } from 'react';
import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  // const [faveRecipes, setFaveRecipes] = useState([]);

  // const retrieveFaveRecipes = localStorage.getItem('favoriteRecipes');

  // useEffect(() => {
  //   setFaveRecipes(retrieveFaveRecipes);
  // }, [retrieveFaveRecipes]);

  const faveRecipes = [{ // usada para testar a renderização dos cards
    id: 123,
    type: 'meal',
    nationality: 'Brazilian',
    category: 'Category',
    alcoholicOrNot: '',
    name: 'NomeDaReceita',
    image: 'imagemDaReceita',
  },
  {
    id: 456,
    type: 'drink',
    nationality: '',
    category: 'Category',
    alcoholicOrNot: 'alcoholic',
    name: 'NomeDaReceita',
    image: 'imagemDaReceita',
  },
  ];

  return (
    <div>
      <Header title="Favorite Recipes" />
      FavoriteRecipes
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          // onClick={ handleFilterAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          // onClick={ handleFilterMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          // onClick={ handleFilterDrinks }
        >
          Drinks
        </button>
      </div>
      <br />
      {
        faveRecipes.map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div key={ index }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
                <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </h4>
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  // onClick={ handleShare }
                >
                  Share
                </button>
                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                  // onClick={ handleFavorite }
                >
                  Favorite
                </button>
              </div>
            );
          }
          return (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot}
              </p>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                // onClick={ handleShare }
              >
                Share
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
                // onClick={ handleFavorite }
              >
                Favorite
              </button>
            </div>
          );
        })
      }
    </div>
  );
}

export default FavoriteRecipes;
