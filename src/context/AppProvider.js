import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);

  const values = useMemo(() => ({
    user,
    setUser,
    recipes,
    setRecipes,
  }), [user, recipes]);

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
