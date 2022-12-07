import React, { useEffect, useState } from 'react';
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
    id: '178319',
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
  ];

  const [filtered, setFiltered] = useState([]);

  const handleFilter = ({ target }) => {
    const chooseFilter = target.name;

    if (chooseFilter === 'all') {
      setFiltered(faveRecipes);
    }
    if (chooseFilter === 'drinks') {
      setFiltered(faveRecipes.filter((recipe) => (
        recipe.type === 'drink'
      )));
    }
    if (chooseFilter === 'meals') {
      setFiltered(faveRecipes.filter((recipe) => (
        recipe.type === 'meal'
      )));
    }
  };

  useEffect(() => {
    setFiltered(faveRecipes);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      FavoriteRecipes
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
      {
        filtered.map((recipe, index) => (<Cards
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
