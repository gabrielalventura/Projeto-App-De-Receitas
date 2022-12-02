import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/DoneCards.css';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

function DoneCards(props) {
  const {
    image,
    name,
    nationality,
    category,
    type,
    alcohol,
    index,
    doneDate,
    tags,
    id,
  } = props;

  const { wasShared, setWasShared } = useContext(AppContext);

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
        className="doneCard-image"
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt="recipe-img"
      />
      <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
      <span
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneDate }
      </span>
      {
        type === 'meal'
          ? (
            <>
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${nationality} - ${category}`}
              </h4>
              <div>
                {
                  tags.map((tagName) => (
                    <p
                      key={ `${tagName}` }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      { `${tagName}` }
                    </p>
                  ))
                }
              </div>
            </>)
          : (
            <h4 data-testid={ `${index}-horizontal-top-text` }>{alcohol}</h4>)
      }
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src="src/images/shareIcon.svg"
        onClick={ handleShare }
        name={ id }
        value={ type }
      >
        Share
      </button>
      <div>
        {
          wasShared && <p>Link copied!</p>
        }
      </div>
    </div>
  );
}

DoneCards.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  alcohol: PropTypes.string,
  index: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(),
}.isRequired;

export default DoneCards;
