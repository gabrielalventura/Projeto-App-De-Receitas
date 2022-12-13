import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../Pages/DoneRecipes';
import AppProvider from '../context/AppProvider';
import doneRecipes from './helpers/mockDoneRecipes';

const doneRecipesMock = doneRecipes;

beforeEach(() => {
  window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
});

describe('Testa a página tela de receitas feitas', () => {
  test('se renderiza o header na página', () => {
    renderWithRouter(
      <AppProvider>
        <DoneRecipes />
      </AppProvider>,
    );

    const headerImg = screen.getByTestId('profile-top-btn');
    expect(headerImg).toBeInTheDocument();
  });

  test('testa se o footer é renderizado na tela', () => {
    renderWithRouter(
      <AppProvider>
        <DoneRecipes />
      </AppProvider>,
    );

    const drinksFooterImg = screen.getByTestId('drinks-bottom-btn');
    expect(drinksFooterImg).toBeInTheDocument();
  });
});

describe('Testa os botões de filtragem', () => {
  test('Testa se ao clicar no botão Meals aparece somente as receitas do tipo Meal', () => {
    renderWithRouter(
      <AppProvider>
        <DoneRecipes />
      </AppProvider>,
    );

    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealsBtn).toBeInTheDocument();

    const drinkRecipe = screen.getByTestId('1-horizontal-top-text');

    userEvent.click(mealsBtn);
    expect(drinkRecipe).not.toBeInTheDocument();
  });

  test('Testa se ao clicar no botão Drinks aparece somente as receitas do tipo Drink', () => {
    renderWithRouter(
      <AppProvider>
        <DoneRecipes />
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

  test('Testa se ao clicar em All todas as receitas voltam a renderizar na tela', () => {
    renderWithRouter(
      <AppProvider>
        <DoneRecipes />
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

describe('Testa funcionalidade do share', () => {
  test('Testa se o botão Share exibe a mensagem quando clicado', () => {
    window.document.execCommand = jest.fn(() => true);

    renderWithRouter(
      <AppProvider>
        <DoneRecipes />
      </AppProvider>,
    );

    const shareBtn = screen.getAllByRole('button');

    expect(shareBtn[3]).toBeInTheDocument();
    const copied = screen.findByText('/Link copied/i');
    userEvent.click(shareBtn[3]);
    waitFor(() => expect(copied).toBeInTheDocument());
  });
});
