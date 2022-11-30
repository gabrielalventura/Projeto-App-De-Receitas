import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import mockFood from './helpers/mockDataFoods';
import mockDrinks from './helpers/mockDataDrinks';
import mockDataCategorysDrinks from './helpers/mockCategorysDrinks';
import mockDataCategorysFoods from './helpers/mockCategorysFoods';
import App from '../App';

jest
  .fn()
  .mockReturnValue(mockFood)
  .mockReturnValueOnce(mockDrinks)
  .mockReturnValueOnce(mockDataCategorysDrinks)
  .mockReturnValueOnce(mockDataCategorysFoods);

describe('testando o componente Meals.js and Drinks.js', () => {
  it('testando se a rota /meals conteḿ as informações necessárias', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();

    const imgIconProfile = screen.getByAltText('profileIcon');
    expect(imgIconProfile).toBeInTheDocument();

    const imgFoodCorba = await screen.findByAltText('receita do prato Corba');
    expect(imgFoodCorba).toBeInTheDocument();

    const allButtons = await screen.findAllByRole('button');
    expect(allButtons.length).toBe(5);

    userEvent.click(buttonProfile);
  });

  it('testando se a rota /drinks conteḿ as informações necessárias', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks');
    });

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();

    const imgIconProfile = screen.getByAltText('profileIcon');
    expect(imgIconProfile).toBeInTheDocument();

    const imgDrink747 = await screen.findByAltText('receita do drink 747');
    expect(imgDrink747).toBeInTheDocument();

    const allButtons = await screen.findAllByRole('button');
    expect(allButtons.length).toBe(5);

    userEvent.click(buttonProfile);
  });
});
