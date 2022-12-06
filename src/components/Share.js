import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

function Share(props) {
  const {
    type,
    id,
    testid,
  } = props;

  const { setWasShared } = useContext(AppContext);

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
    <button
      data-testid={ testid }
      type="button"
      name={ id }
      value={ type }
      src="src/images/shareIcon.svg"
      onClick={ handleShare }
    >
      Share
    </button>
  );
}

Share.propTypes = {
  type: PropTypes.string,
  index: PropTypes.string,
  id: PropTypes.string,
  testid: PropTypes.string,
}.isRequired;

export default Share;
