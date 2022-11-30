import React from 'react';
import PropTypes from 'prop-types';
import Drinks from './Drinks';
import Meals from './Meals';

function Recipes({ history }) {
  if (history.location.pathname === '/drinks') {
    return (
      <Drinks />
    );
  }
  if (history.location.pathname === '/meals') {
    return (
      <Meals />
    );
  }
}

Recipes.propTypes = ({
  history: PropTypes.objectOf(Object),
}).isRequired;

export default Recipes;
