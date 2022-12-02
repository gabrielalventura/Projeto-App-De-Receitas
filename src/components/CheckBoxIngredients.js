import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CheckBoxIngredients(props) {
  const [done, setDone] = useState(false);
  const { ingredient, index } = props;

  const handleChange = () => {
    if (done) {
      setDone(false);
    } else {
      setDone(true);
    }
  };

  return (
    <label
      htmlFor={ `check-${ingredient}` }
      key={ index }
      className={ `ingredients-label-${done}` }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        id={ `check-${ingredient}` }
        type="checkbox"
        className="ingredients-checkbox"
        onChange={ handleChange }
      />
      { ingredient }
    </label>
  );
}

CheckBoxIngredients.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default CheckBoxIngredients;
