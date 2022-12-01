import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { verifyUrl, convertAndFindObject } from './HelperRecipesDetails';

function RecipesDetails({ history }) {
  const {
    fetchDrinks: { data: { drinks } },
    fetchMeals: { data: { meals } },
  } = useContext(AppContext);

  // const [renderComponent, setRenderComponent] = useState({});
  const urlInclude = history.location.pathname;

  useEffect(() => {
    if (verifyUrl(urlInclude, 'meal')) {
      const findMeal = convertAndFindObject(urlInclude, meals, 'meal');
      console.log(findMeal);
      // setRenderComponent(findMeal);
    }
    if (verifyUrl(urlInclude, 'drink')) {
      const findDrink = convertAndFindObject(urlInclude, drinks, 'drink');
      console.log(findDrink);
      // setRenderComponent(findDrink);
    }
  }, []);

  return (
    <section>
      RecipesDetails
    </section>
  );
}

RecipesDetails.propTypes = ({
  history: PropTypes.objectOf(Object),
}).isRequired;

export default RecipesDetails;
