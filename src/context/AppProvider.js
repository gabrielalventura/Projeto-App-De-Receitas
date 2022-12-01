import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const fetchDrinks = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const fetchDrinksCategory = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const fetchMeals = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const fetchFoodsCategorys = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  const values = useMemo(() => ({
    user,
    setUser,
    fetchDrinks,
    fetchDrinksCategory,
    fetchMeals,
    fetchFoodsCategorys,
  }), [user, fetchDrinks, fetchDrinksCategory, fetchMeals, fetchFoodsCategorys]);

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
