import React from 'react';
import PropTypes from 'prop-types';

function RecomendedCard(props) {
  const {
    recomended,
    history,
  } = props;
  return (
    <div className="containerRecomended">
      {history.location.pathname.includes('meal')
          && recomended.length > 0
          && recomended[0].strDrinkThumb
          && recomended.map((element, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>
              <img
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
                className="imgRecomended"
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {element.strDrink}
              </p>
            </div>
          ))}
      {history.location.pathname.includes('drink')
          && recomended.length > 0
          && recomended[0].strMealThumb
          && recomended.map((element, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>
              <img
                src={ element.strMealThumb }
                alt={ element.strMeal }
                className="imgRecomended"
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {element.strMeal}
              </p>
            </div>
          ))}
    </div>
  );
}

RecomendedCard.propTypes = {
  history: PropTypes.objectOf(Object),
  recomended: PropTypes.arrayOf(Object),
}.isRequired;

export default RecomendedCard;
