import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../Pages/FavoriteRecipes';

describe('Testa a página Favorite Recipes', () => {
  test('se renderiza os três botões de filtro', () => {
    renderWithRouter(<FavoriteRecipes />);

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    expect(filterAllBtn).toBeInTheDocument();

    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(filterMealBtn).toBeInTheDocument();

    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrinkBtn).toBeInTheDocument();
  });
});
