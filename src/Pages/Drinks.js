import React from 'react';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';

function Drinks() {
  const {
    data: { drinks },
  } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const {
    data: { drinks: categorysDrinks },
  } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  return (
    <div>
      <Header title="Drinks" />
      Drinks
      <p>Categorias</p>
      {categorysDrinks
        && categorysDrinks.map(({ strCategory }, index) => {
          const five = 5;
          if (index < five) {
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `${strCategory}-category-filter` }
              >
                {strCategory}
              </button>
            );
          } return undefined;
        })}
      {drinks
        && drinks.map((drink, key) => {
          const twelve = 12;
          if (key < twelve) {
            return (
              <div key={ key } data-testid={ `${key}-recipe-card` }>
                <p data-testid={ `${key}-card-name` }>{drink.strDrink}</p>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ `receita do drink ${drink.strDrink}` }
                  data-testid={ `${key}-card-img` }
                />
              </div>
            );
          }
          return undefined;
        })}
    </div>
  );
}

export default Drinks;
