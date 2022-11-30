import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from './helpers/renderWithRouter';
import loginData from './constants/Login';

describe('Testes da página de login', () => {
  it('Verifica se a página de login contém os inputs de email, senha e botão Enter', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: 'Enter' });

    expect(inputEmail.value).toBe('');
    expect(inputPassword.value).toBe('');
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();

    userEvent.type(inputEmail, loginData.validEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.validPassword);
    expect(enterBtn).not.toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.validEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.invalidPassword);
    expect(enterBtn).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.invalidEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.validPassword);
    expect(enterBtn).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.invalidEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.invalidPassword);
    expect(enterBtn).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, loginData.validEmail);
    expect(enterBtn).toBeDisabled();
    userEvent.type(inputPassword, loginData.validPassword);
    expect(enterBtn).not.toBeDisabled();

    userEvent.click(enterBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});
