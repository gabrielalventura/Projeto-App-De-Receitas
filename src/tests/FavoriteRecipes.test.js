import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import AppProvider from '../context/AppProvider';
import faveRecipes from './helpers/mockFaveRecipes';

const faveRecipesMock = faveRecipes;

beforeEach(() => {
  window.localStorage.setItem('favoriteRecipes', JSON.stringify(faveRecipesMock));
});

describe('Testa a página Favorite Recipes', () => {
  test('se renderiza os três botões de filtro', () => {
    renderWithRouter(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    expect(filterAllBtn).toBeInTheDocument();

    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(filterMealBtn).toBeInTheDocument();

    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrinkBtn).toBeInTheDocument();
  });

  test('se ao clicar no botão de filtrar Meals, apenas comidas são renderizadas na tela', () => {
    renderWithRouter(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealsBtn).toBeInTheDocument();

    const drinkRecipe = screen.getByTestId('1-horizontal-top-text');

    userEvent.click(mealsBtn);
    expect(drinkRecipe).not.toBeInTheDocument();
  });

  test('se ao clicar no botão de filtrar Drinks, apenas drinks são renderizadas na tela', () => {
    // renderWithRouter(<FavoriteRecipes />);
    renderWithRouter(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinksBtn).toBeInTheDocument();

    const drinkRecipe = screen.getByTestId('0-horizontal-name');
    const mealRecipe = screen.getByTestId('1-horizontal-name');

    userEvent.click(drinksBtn);
    expect(drinkRecipe).toBeInTheDocument();
    expect(mealRecipe).not.toBeInTheDocument();
  });

  test('se ao clicar no botão de filtrar All, todas as receitas são renderizadas na tela', () => {
    // renderWithRouter(<FavoriteRecipes />);
    renderWithRouter(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    const mealRecipe = screen.getByTestId('0-horizontal-name');
    const drinkRecipe = screen.getByTestId('1-horizontal-name');

    userEvent.click(allBtn);
    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();
  });
});
