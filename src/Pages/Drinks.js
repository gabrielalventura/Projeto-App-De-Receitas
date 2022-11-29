import React from 'react';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';

function Drinks() {
  const { data: { drinks } } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  return (
    <div>
      <Header title="Drinks" />
        Drinks
      { drinks !== undefined && drinks.map((drink, key) => {
        const twelve = 12;
        if (key < twelve) {
          return (
            <div
              key={ key }
              data-testid={ `${key}-recipe-card` }
            >
              <p data-testid={ `${key}-card-name` }>{drink.strDrink}</p>
              <img
                src={ drink.strDrinkThumb }
                alt={ `receita do prato ${drink.strDrink}` }
                data-testid={ `${key}-card-img` }
              />
            </div>
          );
        }
        return undefined;
      }) }
    </div>
  );
}

export default Drinks;
