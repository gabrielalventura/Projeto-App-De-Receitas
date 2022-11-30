import React from 'react';
import PropTypes from 'prop-types';

function Cards(props) {
  const {
    image,
    name,
    nationality,
    category,
    type,
    alcohol,
    index,
  } = props;

  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt={ name }
      />
      <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
      {
        type === 'meal'
          ? (
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nationality} - ${category}`}
            </h4>)
          : (
            <h4 data-testid={ `${index}-horizontal-top-text` }>{alcohol}</h4>)
      }
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
      // onClick={ handleShare }
      >
        Share
      </button>
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        type="button"
      // onClick={ handleFavorite }
      >
        Favorite
      </button>
    </div>
  );
}

Cards.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  alcohol: PropTypes.string,
  index: PropTypes.string,
}.isRequired;

export default Cards;
