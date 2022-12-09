import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import mockFood from './helpers/mockDataFoods';
import mockDrinks from './helpers/mockDataDrinks';
import mockDataCategorysDrinks from './helpers/mockCategorysDrinks';
import mockDataCategorysFoods from './helpers/mockCategorysFoods';
import loginData from './constants/Login';
import AppProvider from '../context/AppProvider';
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

describe('testando o componente Meals.js and Drinks.js', () => {
  it('testando se a rota /meals conteḿ as informações necessárias', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
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
    expect(allButtons.length).toBe(7);

    userEvent.click(buttonProfile);
  });

  it('testando se a rota /drinks conteḿ as informações necessárias', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
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
    expect(allButtons.length).toBe(7);

    userEvent.click(buttonProfile);
  });

  it('testando o caminho do usuário', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const btnBeef = await screen.findByTestId('Goat-category-filter');
    expect(btnBeef).toBeInTheDocument();
    const btnBreakFeast = await screen.findByTestId('Breakfast-category-filter');
    expect(btnBreakFeast).toBeInTheDocument();

    const imgCorba = await screen.findByAltText('receita do prato Corba');
    expect(imgCorba).toBeInTheDocument();
    userEvent.click(btnBreakFeast);
    userEvent.click(btnBeef);

    act(() => {
      history.push('/drinks');
    });

    const btnOrdinary = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(btnOrdinary).toBeInTheDocument();
    userEvent.click(btnOrdinary);
  });

  it('', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: 'Enter' });

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.validEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.validPassword);
    expect(enterBtn).not.toBeDisabled();

    userEvent.click(enterBtn);

    expect(history.location.pathname).toBe('/meals');

    const ggLink = await screen.findByText('Corba');
    expect(ggLink).toBeInTheDocument();

    userEvent.click(ggLink);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: 'Enter' });

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.validEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.validPassword);
    expect(enterBtn).not.toBeDisabled();

    userEvent.click(enterBtn);

    expect(history.location.pathname).toBe('/meals');

    const btnDrink = await screen.findByTestId('drinks-bottom-btn');
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
    expect(history.location.pathname).toBe('/drinks');
  });
});
