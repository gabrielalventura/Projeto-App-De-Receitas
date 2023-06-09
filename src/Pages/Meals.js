import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Meals() {
  const {
    fetchFoodsCategorys: { data: { meals: categorysFoods } },
    fetchMeals: { data },
    filteredRecipes,
    setRecipes,
    setCurrentPage,
  } = useContext(AppContext) || [];
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);
  const [dataFoods, setDataFoods] = useState([]);
  const filteredCategoryFood = useFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedFilterCategory[0]}`);

  useEffect(() => {
    // let chaves = Object.keys(filteredRecipes);
    // console.log(Object.keys(filteredRecipes));
    if (selectedFilterCategory.length > 0) {
      setDataFoods(filteredCategoryFood.data);
    } else if (filteredRecipes.meals.length > 0) {
      // console.log(filteredRecipes);
      setDataFoods(filteredRecipes);
    } else {
      setDataFoods(data);
    }
  }, [filteredCategoryFood, data, selectedFilterCategory, filteredRecipes]);
  useEffect(() => {
    setRecipes(data);
  }, [data]);
  useEffect(() => {
    setCurrentPage('meals');
  });

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
                  if (target.innerHTML === selectedFilterCategory[0]) {
                    return setSelectedFilterCategory([]);
                  }
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
        && dataFoods.meals.map(({ strMeal, strMealThumb, idMeal }, key) => {
          const twelve = 12;
          if (key < twelve) {
            return (
              <Link
                key={ key }
                data-testid={ `${key}-recipe-card` }
                to={ `/meals/${idMeal}` }
              >
                <p data-testid={ `${key}-card-name` }>{strMeal}</p>
                <img
                  src={ strMealThumb }
                  data-testid={ `${key}-card-img` }
                  alt={ `receita do prato ${strMeal}` }
                />
              </Link>
            );
          }
          return undefined;
        })}
    </div>
  );
}

export default Meals;
