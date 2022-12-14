import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function Share(props) {
  const {
    type,
    id,
    testid,
  } = props;

  const { setWasShared } = useContext(AppContext);

  const handleShare = ({ target }) => {
    const recipeID = target.closest('button').name;
    const recipeType = target.closest('button').value;

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
      // data-testid={ testid }
      type="button"
      name={ id }
      value={ type }
      // src="src/images/shareIcon.svg"
      onClick={ handleShare }
    >
      <img
        data-testid={ testid }
        src={ shareIcon }
        alt="share"
      />
      {/* Share */}
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
