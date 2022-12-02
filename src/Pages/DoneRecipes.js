import React, { useState } from 'react';
import doneRecipes from '../tests/helpers/mockDoneRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoneCards from '../components/DoneCards';

function DoneRecipes() {
  // const doneRecipes = localStorage.getItem('doneRecipes');
  // const [doneRecipesState, setDoneRecipesState] = ([]);

  // useEffect(() => {
  //   setDoneRecipesState(doneRecipes);
  // }, [doneRecipes]);

  // console.log(doneRecipes);
  const [doneRecipesState] = useState(doneRecipes); // teste da renderização

  return (
    <>
      <Header title="Done Recipes" />
      <div>
        <div>
          <button
            name="all"
            type="button"
            data-testid="filter-by-all-btn"
            // onClick={ () => console.log('Clicou') }
          >
            All
          </button>
          <button
            name="meals"
            type="button"
            data-testid="filter-by-meal-btn"
            // onClick={ () => console.log('Clicou') }
          >
            Meals
          </button>
          <button
            name="drinks"
            type="button"
            data-testid="filter-by-drink-btn"
            // onClick={ () => console.log('Clicou') }
          >
            Drinks
          </button>
        </div>
        <section>
          {
            doneRecipesState.map((recipe, index) => (<DoneCards
              key={ index }
              image={ recipe.image }
              name={ recipe.name }
              nationality={ recipe.nationality }
              category={ recipe.category }
              type={ recipe.type }
              alcohol={ recipe.alcoholicOrNot }
              index={ index }
              doneDate={ recipe.doneDate }
              tags={ recipe.tags }
              id={ recipe.id }
            />))
          }
        </section>
        <Footer />
      </div>
    </>
  );
}

export default DoneRecipes;
