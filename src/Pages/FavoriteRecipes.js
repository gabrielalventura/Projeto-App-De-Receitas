// import React, { useState, useEffect } from 'react';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';

function FavoriteRecipes() {
  // const { faveRecipes, setFaveRecipes} = useContext(AppProvider)

  // const retrieveFaveRecipes = localStorage.getItem('favoriteRecipes');

  // useEffect(() => {
  //   setFaveRecipes(retrieveFaveRecipes);
  // }, [retrieveFaveRecipes]);

  const faveRecipes = [{ // usada para testar a renderização dos cards
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: 456,
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
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
          image={ recipe.image }
          name={ recipe.name }
          nationality={ recipe.nationality }
          category={ recipe.category }
          type={ recipe.type }
          alcohol={ recipe.alcoholicOrNot }
          index={ index }
          id={ recipe.id }
        />))
      }
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
