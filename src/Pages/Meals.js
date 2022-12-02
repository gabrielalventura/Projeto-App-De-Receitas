import React, { useContext, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Meals() {
  const { setRecipes } = useContext(AppContext);
  const {
    data: { meals },
  } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  const {
    data: { meals: categorysFoods },
  } = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  useEffect(() => {
    setRecipes(meals);
  }, [meals]);
  return (
    <div>
      <Header title="Meals" />
      <h1>Meals</h1>
      <p>Categorias</p>
      {categorysFoods
        && categorysFoods.map(({ strCategory }, index) => {
          const five = 5;
          if (index < five) {
            return (
              <button
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
              >
                {strCategory}
              </button>
            );
          } return undefined;
        })}
      {meals
        && meals.map(({ strMeal, strMealThumb }, key) => {
          const twelve = 12;
          if (key < twelve) {
            return (
              <div key={ key } data-testid={ `${key}-recipe-card` }>
                <p data-testid={ `${key}-card-name` }>{strMeal}</p>
                <img
                  src={ strMealThumb }
                  data-testid={ `${key}-card-img` }
                  alt={ `receita do prato ${strMeal}` }
                />
              </div>
            );
          }
          return undefined;
        })}
    </div>
  );
}

export default Meals;
