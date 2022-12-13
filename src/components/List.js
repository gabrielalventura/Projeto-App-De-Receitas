import React from 'react';
import PropTypes from 'prop-types';

function List(props) {
  const {
    selectedCategory,
  } = props;
  // console.log(selectedCategory);
  return (
    <ul>
      {selectedCategory.ingredients
          && selectedCategory.ingredients.map((ingredient, index) => {
            if (ingredient !== null && ingredient.length > 0) {
              return (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {ingredient}
                  {' of '}
                  {selectedCategory.measures[index]}
                </li>
              );
            }
            return '';
          })}
    </ul>
  );
}

List.propTypes = {
  selectedCategory: PropTypes.objectOf(Object),
}.isRequired;

export default List;
