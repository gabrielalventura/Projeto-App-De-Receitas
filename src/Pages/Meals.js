import React from 'react';
import useFetch from '../hooks/useFetch';

function Meals() {
  const { data: { meals } } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  console.log(meals);
  return (
    <div>
      { meals !== undefined && meals.map((meal, key) => {
        const twelve = 12;
        if (key < twelve) {
          return (
            <div
              key={ key }
              data-testid={ `${key}-recipe-card` }
            >
              <p data-testid={ `${key}-card-name` }>{meal.strMeal}</p>
              <img
                src={ meal.strMealThumb }
                data-testid={ `${key}-card-img` }
                alt={ `receita do prato ${meal.strMeal}` }
              />
            </div>
          );
        } return undefined;
      }) }
    </div>
  );
}

export default Meals;
