// import React, { useState, useEffect } from 'react';
// import clipboardCopy from 'clipboard-copy';
import React from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';

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
        faveRecipes.map((recipe, index) => (<Cards
          key={ index }
          image={ recipe.image } // sucessivamente
          name={ recipe.name }
          nationality={ recipe.nationality }
          category={ recipe.category }
          type={ recipe.type }
          alcohool={ recipe.alcoholicOrNot }
          index={ index }
        />))
      }
    </div>
  );
}

export default FavoriteRecipes;
