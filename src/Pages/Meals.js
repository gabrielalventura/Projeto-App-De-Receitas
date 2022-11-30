import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';

function Meals() {
  const {
    fetchFoodsCategorys: { data: { meals: categorysFoods } },
    fetchMeals: { data },
  } = useContext(AppContext) || [];
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);
  const [dataFoods, setDataFoods] = useState([]);
  const filteredCategoryFood = useFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedFilterCategory[0]}`);

  useEffect(() => {
    if (selectedFilterCategory.length > 0) {
      setDataFoods(filteredCategoryFood.data);
    } else {
      setDataFoods(data);
    }
  }, [filteredCategoryFood, data, selectedFilterCategory]);

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
                onClick={ ({ target }) => {
                  setSelectedFilterCategory([target.innerHTML]);
                } }
              >
                {strCategory}
              </button>
            );
          } return undefined;
        })}
      <button
        type="button"
        onClick={ () => setSelectedFilterCategory([]) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {dataFoods.meals
        && dataFoods.meals.map(({ strMeal, strMealThumb }, key) => {
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
