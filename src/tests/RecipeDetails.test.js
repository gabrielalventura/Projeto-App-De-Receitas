import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import AppProvider from '../context/AppProvider';
import mockFood from './helpers/mockDataFoods';
import mockDrinks from './helpers/mockDataDrinks';
import mockDataCategorysDrinks from './helpers/mockCategorysDrinks';
import mockDataCategorysFoods from './helpers/mockCategorysFoods';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

jest
  .fn()
  .mockReturnValue(mockFood)
  .mockReturnValueOnce(mockDrinks)
  .mockReturnValueOnce(mockDataCategorysDrinks)
  .mockReturnValueOnce(mockDataCategorysFoods);
afterEach(() => {
  jest.clearAllMocks();
});
describe('TESTANDO O COMPONENT RECIPEDETAILS', () => {
  it('testando component recipeDetails/foods', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/meals/52977');
    });
    expect(history.location.pathname).toBe('/meals/52977');

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();

    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const category = await screen.findByTestId('recipe-category');
    expect(category).toBeInTheDocument();

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const ytb = await screen.findByTestId('video');
    expect(ytb).toBeInTheDocument();

    const startRecipe = await screen.findByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();

    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });

  it('testando component recipeDetails/drinks', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/drinks/15997');
    });
    expect(history.location.pathname).toBe('/drinks/15997');

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();

    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const category = await screen.findByTestId('recipe-category');
    expect(category).toBeInTheDocument();

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const ytb = await screen.findByTestId('video');
    expect(ytb).toBeInTheDocument();

    const startRecipe = await screen.findByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();

    const list0 = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(list0).toBeInTheDocument();

    const list1 = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(list1).toBeInTheDocument();

    const list2 = await screen.findByTestId('2-ingredient-name-and-measure');
    expect(list2).toBeInTheDocument();

    userEvent.click(startRecipe);

    expect(history.location.pathname).toBe('drinks/15997/in-progress');
  });
});
