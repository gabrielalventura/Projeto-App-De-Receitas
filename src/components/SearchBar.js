import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {
  const [searchCat, setSearchCat] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { setFilteredRecipes, currentPage } = useContext(AppContext);
  const ing = 'ingredient';
  const nam = 'name';
  const fst = 'first-letter';

  const filteredFetch = async (url) => {
    const response = await fetch(url);
    const api = response.json();

    return api;
  };

  const mealSearch = async () => {
    if (searchCat === ing) {
      const filterByIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      const resFetch = await filteredFetch(filterByIngredient);
      const objState = {
        meals: resFetch.meals,
        drinks: [],
      };
      setFilteredRecipes(objState);
    } else if (searchCat === nam) {
      const filterByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      const resFetch = await filteredFetch(filterByName);
      const objState = {
        meals: resFetch.meals,
        drinks: [],
      };
      setFilteredRecipes(objState);
    } else {
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      const filterByFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      const resFetch = await filteredFetch(filterByFirstLetter);
      const objState = {
        meals: resFetch.meals,
        drinks: [],
      };
      setFilteredRecipes(objState);
    }
  };

  const drinkSearch = async () => {
    if (searchCat === ing) {
      const filterByIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      const resFetch = await filteredFetch(filterByIngredient);
      const objState = {
        drinks: resFetch.drinks,
        meals: [],
      };
      setFilteredRecipes(objState);
    } else if (searchCat === nam) {
      const filterByName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      const resFetch = await filteredFetch(filterByName);
      const objState = {
        drinks: resFetch.drinks,
        meals: [],
      };
      setFilteredRecipes(objState);
    } else {
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      const filterByFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      const resFetch = await filteredFetch(filterByFirstLetter);
      const objState = {
        drinks: resFetch.drinks,
        meals: [],
      };
      setFilteredRecipes(objState);
    }
  };

  const requestSearch = async () => {
    if (currentPage === 'meals') {
      mealSearch();
    } else {
      drinkSearch();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ inputValue }
        onChange={ handleChange }
      />
      <input
        type="radio"
        value="ingredient"
        name="teste"
        onChange={ () => setSearchCat(ing) }
        data-testid="ingredient-search-radio"
      />
      Ingredient
      <input
        type="radio"
        value="name"
        name="teste"
        onChange={ () => setSearchCat(nam) }
        data-testid="name-search-radio"
      />
      Name
      <input
        type="radio"
        value="first-letter"
        name="teste"
        onChange={ () => setSearchCat(fst) }
        data-testid="first-letter-search-radio"
      />
      First Letter
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ requestSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
