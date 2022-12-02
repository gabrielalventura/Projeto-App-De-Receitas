import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);
  const fetchDrinks = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const fetchDrinksCategory = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const fetchMeals = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const fetchFoodsCategorys = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const [faveRecipes, setFaveRecipes] = useState([]);
  const [wasShared, setWasShared] = useState(false); // usar para construir ternário com msg "Link copied!"

  const values = useMemo(() => ({
    user,
    setUser,
    fetchDrinks,
    fetchDrinksCategory,
    fetchMeals,
    fetchFoodsCategorys,
    faveRecipes,
    setFaveRecipes,
    wasShared,
    setWasShared,
    recipes,
    setRecipes,
  }), [user, fetchDrinks,
    fetchDrinksCategory, fetchMeals, fetchFoodsCategorys,
    faveRecipes, setFaveRecipes, wasShared, setWasShared, user, recipes]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default AppProvider;
