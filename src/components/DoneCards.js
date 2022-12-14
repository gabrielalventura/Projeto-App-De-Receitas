import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Share from './Share';
import '../styles/DoneCards.css';
import AppContext from '../context/AppContext';

// const copy = require('clipboard-copy');

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

  const { wasShared } = useContext(AppContext);

  // const handleShare = ({ target }) => {
  //   const recipeID = target.name;
  //   const recipeType = target.value;

  //   if (recipeType === 'meal') {
  //     copy(`http://localhost:3000/meals/${recipeID}`);
  //     setWasShared(true);
  //   } else {
  //     copy(`http://localhost:3000/drinks/${recipeID}`);
  //     setWasShared(true);
  //   }
  // };

  return (
    <div>
      <div className="uniqueCard">
        <Link
          className="cardInf"
          to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
        >
          <img
            className="doneCard-image"
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="recipe-img"
          />
          <div className="cardInfos">
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
                    <h5
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${nationality} - ${category}`}
                    </h5>
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
                  <h5 data-testid={ `${index}-horizontal-top-text` }>{alcohol}</h5>)
            }
          </div>
        </Link>
        {/* <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src="src/images/shareIcon.svg"
        onClick={ handleShare }
        name={ id }
        value={ type }
      >
        Share
      </button> */}
        <div className="btnShare">
          <Share
            index={ index }
            type={ type }
            id={ id }
            testid={ `${index}-horizontal-share-btn` }
          />
        </div>
        <div>
          {
            wasShared && <p data-testid="text-share">Link copied!</p>
          }
        </div>
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
