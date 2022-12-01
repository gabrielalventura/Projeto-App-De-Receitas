import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';

function Drinks() {
  const {
    fetchDrinksCategory: { data: { drinks: categorysDrinks } },
    fetchDrinks: { data },
  } = useContext(AppContext) || [];
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const filteredByCategory = useFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedFilterCategory[0]}`);
  useEffect(() => {
    if (selectedFilterCategory.length > 0) {
      setDataDrinks(filteredByCategory.data);
    } else {
      setDataDrinks(data);
    }
  }, [data, selectedFilterCategory, filteredByCategory]);

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
                onClick={ ({ target }) => {
                  setSelectedFilterCategory([target.innerHTML]);
                } }
              >
                {strCategory}
              </button>
            );
          }
          return undefined;
        })}
      <button
        type="button"
        onClick={ () => setSelectedFilterCategory([]) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {dataDrinks.drinks
        && dataDrinks.drinks.map((drink, key) => {
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
