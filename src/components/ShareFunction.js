import { useContext } from 'react';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

function ShareFunction() {
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
    handleShare()
  );
}

export default ShareFunction;
