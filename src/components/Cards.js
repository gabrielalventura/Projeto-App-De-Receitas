import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Cards.css';
// import { copy } from 'clipboard-copy';
const copy = require('clipboard-copy');

function Cards(props) {
  const {
    image,
    name,
    nationality,
    category,
    type,
    alcohol,
    index,
    id,
  } = props;

  const [wasShared, setWasShared] = useState(false); // usar para construir ternário com msg "Link copied!"

  const handleShare = ({ target }) => {
    const recipeID = target.name;
    const recipeType = target.value;

    if (recipeType === 'meal') {
      copy(`http://localhost:3000/meals/${recipeID}`);
      setWasShared(true);
    } else {
      copy(`http://localhost:3000/drinks/${recipeID}`);
      setWasShared(true);
    }
  };

  return (
    <div>
      <img
        className="card-image"
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
        name={ id }
        value={ type }
        src="src/images/shareIcon.svg"
        onClick={ handleShare }
      >
        Share
      </button>
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        type="button"
        src="src/images/blackHeartIcon.svg"
      // onClick={ handleFavorite }
      >
        Unfavorite
      </button>
      <br />
      <div>
        { wasShared && <p>Link copied!</p>}
      </div>
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
