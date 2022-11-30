
import React, { useState } from 'react';
import doneRecipes from './helpers/mockDoneRecipes';
import Header from '../components/Header';

function DoneRecipes() {
  // const doneRecipes = localStorage.getItem('doneRecipes');
  console.log(doneRecipes);
  const [doneRecipesState] = useState(doneRecipes);

  return (
    <Header title="Done Recipes" />
    <div>
      <div>
        <button
          name="all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => console.log('Clicou') }
        >
          All
        </button>
        <button
          name="meals"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => console.log('Clicou') }
        >
          Meals
        </button>
        <button
          name="drinks"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => console.log('Clicou') }
        >
          Drinks
        </button>
      </div>
      <section>
        {
          doneRecipesState.map((recipe, index) => (
            <div
              key={ `${recipe.id} ` }
            >
              <img
                alt="img-recipes"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
              />
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.category}` }
              </h4>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                { `${recipe.name}` }
              </p>
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `${recipe.doneDate}` }
              </span>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Share
              </button>
              <div>
                {
                  recipe.tags.map((tagName) => (
                    <p
                      key={ `${tagName}` }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      { `${tagName}` }
                    </p>
                  ))
                }
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
}

export default DoneRecipes;
