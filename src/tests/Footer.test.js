import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from './helpers/renderWithRouter';
import loginData from './constants/Login';

describe('Testes do Footer', () => {
  it('Verifica se o Footer contem os ícones de drinks e meals', () => {
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

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Verifica se ao clicar no ícone drinks, é redirecionado para /drinks e ao clicar no ícone meals é redirecionado para /meals', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: 'Enter' });

    expect(history.location.pathname).toBe('/');

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.validEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.validPassword);
    expect(enterBtn).not.toBeDisabled();

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/meals');

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();

    userEvent.click(drinksIcon);

    expect(history.location.pathname).toBe('/drinks');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    userEvent.click(mealsIcon);
    expect(history.location.pathname).toBe('/meals');
  });
});
