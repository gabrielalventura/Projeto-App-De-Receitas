import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../Pages/DoneRecipes';

describe('Testa a página tela', () => {
  test('se renderiza o header na página', () => {
    renderWithRouter(<DoneRecipes />);

    const headerImg = screen.getByTestId('profile-top-btn');
    expect(headerImg).toBeInTheDocument();
  });

  test('testa se o footer é renderizado na tela', () => {
    renderWithRouter(<DoneRecipes />);

    const drinksFooterImg = screen.getByTestId('drinks-bottom-btn');
    expect(drinksFooterImg).toBeInTheDocument();
  });

  // test('teste se os botões de filtragem são renderizados', () => {
  //   renderWithRouter(<DoneRecipes />);

  //   const filterAllBtn = screen.getByTestId('filter-by-all-btn');
  //   expect(filterAllBtn).toBeInTheDocument();

  //   const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
  //   expect(filterMealBtn).toBeInTheDocument();

  //   const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
  //   expect(filterDrinkBtn).toBeInTheDocument();
  // });
});
