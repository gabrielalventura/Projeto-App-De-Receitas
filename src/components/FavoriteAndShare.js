import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Share from './Share';
import FavoriteButton from './FavoriteButton';
import AppContext from '../context/AppContext';

function FavoriteAndShare(props) {
  const {
    history,
    selectedCategory,
  } = props;
  // console.log(selectedCategory.alcoholic);
  const dataContext = useContext(AppContext);
  return (
    <div>
      {history.location.pathname.includes('drink') ? (
        <>
          <Share type="drink" id={ selectedCategory.id } testid="share-btn" />
          <FavoriteButton
            type="drink"
            recipe={ {
              idDrink: selectedCategory.id,
              // alcoholicOrNot: selectedCategory.alcoholic,
              strDrink: selectedCategory.title,
              strCategory: selectedCategory.category,
              strDrinkThumb: selectedCategory.thumb,
              strAlcoholic: selectedCategory.alcoholic,
              // category: selectedCategory.category,
              type: 'drink',
            } }
            testid="favorite-btn"
          />
        </>
      ) : (
        <>
          <Share type="meal" id={ selectedCategory.id } testid="share-btn" />
          <FavoriteButton
            type="meal"
            recipe={ {
              idMeal: selectedCategory.id,
              strArea: selectedCategory.area,
              strMeal: selectedCategory.title,
              strCategory: selectedCategory.category,
              strMealThumb: selectedCategory.thumb,
              alcoholicOrNot: '',
              type: 'meal',
            } }
            testid="favorite-btn"
          />
        </>
      )}

      <span>
        {dataContext.wasShared && <p>Link copied!</p>}
      </span>
    </div>
  );
}

FavoriteAndShare.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default FavoriteAndShare;
