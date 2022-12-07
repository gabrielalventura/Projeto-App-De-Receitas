import React from 'react';
import PropTypes from 'prop-types';
import Drinks from './Drinks';
import Meals from './Meals';
import Footer from '../components/Footer';

function Recipes({ history }) {
  if (history.location.pathname === '/drinks') {
    return (
      <div>
        <Drinks />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Meals />
      <Footer />
    </div>
  );
}

Recipes.propTypes = ({
  history: PropTypes.objectOf(Object),
}).isRequired;

export default Recipes;
