// import React, { useEffect, useState } from 'react';
import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  // const teste = [{ // usada para testar a renderização dos cards
  //   id: '52771',
  //   type: 'meal',
  //   nationality: 'Italian',
  //   category: 'Vegetarian',
  //   alcoholicOrNot: '',
  //   name: 'Spicy Arrabiata Penne',
  //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  // },
  // {
  //   id: '178319',
  //   type: 'drink',
  //   nationality: '',
  //   category: '',
  //   alcoholicOrNot: 'Alcoholic',
  //   name: 'Aquamarine',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  // },
  // ];

  const { faveRecipes, setFaveRecipes } = useContext(AppContext);
  const retrieveFaveRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(retrieveFaveRecipes);

  const handleFilter = ({ target }) => {
    const chooseFilter = target.name;
    console.log(chooseFilter);

    if (chooseFilter === 'all') {
      setFaveRecipes(retrieveFaveRecipes);
    }
    if (chooseFilter === 'drinks' && retrieveFaveRecipes !== null) {
      setFaveRecipes(retrieveFaveRecipes.filter((recipe) => (
        recipe.type === 'drink'
      )));
    }
    if (chooseFilter === 'meals' && retrieveFaveRecipes !== null) {
      setFaveRecipes(retrieveFaveRecipes.filter((recipe) => (
        recipe.type === 'meal'
      )));
    }
  };
  useEffect(() => {
    setFaveRecipes(retrieveFaveRecipes);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          name="meals"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drinks"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      <br />
      { faveRecipes !== null
        && faveRecipes.map((recipe, index) => (<Cards
          key={ index }
          image={ recipe.image }
          name={ recipe.name }
          nationality={ recipe.nationality }
          category={ recipe.category }
          type={ recipe.type }
          alcohol={ recipe.alcoholicOrNot }
          index={ index }
          id={ recipe.id }
        />))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
