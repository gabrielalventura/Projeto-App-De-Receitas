import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DoneCards.css';

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
  } = props;

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
        onClick={ console.log('Clicou') }
      >
        Share
      </button>
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
