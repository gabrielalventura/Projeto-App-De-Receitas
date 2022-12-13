import React from 'react';
import PropTypes from 'prop-types';

function CardDetails(props) {
  const {
    selectedCategory,
  } = props;
  return (
    <div>
      <h2 data-testid="recipe-title">{selectedCategory.title}</h2>
      <img
        src={ selectedCategory.thumb }
        alt={ selectedCategory.title }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">
        { `${selectedCategory.alcoholic}
           ${selectedCategory.category}`}
      </p>

      <p data-testid="instructions">{selectedCategory.instructions}</p>
      <iframe
        height="480"
        width="500"
        title={ `Video de instrução para o prato ${selectedCategory.title}` }
        src={ selectedCategory.linkYtb }
        data-testid="video"
      />
    </div>
  );
}

CardDetails.propTypes = {
  selectedCategory: PropTypes.objectOf(String),
}.isRequired;

export default CardDetails;
