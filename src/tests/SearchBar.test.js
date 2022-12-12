import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';
import Meals from '../Pages/Meals';
import mockFood from './helpers/mockDataFoods';

const SEARCH_INPUT = 'search-input';

describe('Testa o componente SearchBar', () => {
  test('se na página Meals, ao selecionar Ingredients, a busca na API é feita corretamente pelo ingrediente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFood),
    });

    renderWithRouter(
      <AppProvider>
        <Meals />
      </AppProvider>,
    );

    const buttons = screen.getAllByRole('button'); // deve pegar o botão search da página. testar se ele é achado
    expect(buttons[0]).toBeInTheDocument();
    userEvent.click(buttons[0]);

    const ingredientsBtn = screen.getByTestId('ingredient-search-radio');
    expect(ingredientsBtn).toBeInTheDocument();
    userEvent.click(ingredientsBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Butter');

    const recipe = screen.findByText('Kumpir');
    waitFor(() => expect(recipe).toBeInTheDocument());
  });

  test('se na página Meals, ao selecionar Name, a busca na API é feita corretamente pelo nome', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFood),
    });

    renderWithRouter(
      <AppProvider>
        <Meals />
      </AppProvider>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    userEvent.click(buttons[0]);

    const nameBtn = screen.getByTestId('name-search-radio');
    expect(nameBtn).toBeInTheDocument();
    userEvent.click(nameBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Kumpir');

    const recipeName = screen.findByText('Kumpir');
    waitFor(() => expect(recipeName).toBeInTheDocument());
  });

  test('se na página Meals, ao selecionar Firt Letter, a busca na API é feita corretamente pela primeira letra', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFood),
    });

    renderWithRouter(
      <AppProvider>
        <Meals />
      </AppProvider>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    userEvent.click(buttons[0]);

    const nameBtn = screen.getByTestId('first-letter-search-radio');
    expect(nameBtn).toBeInTheDocument();
    userEvent.click(nameBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'K');

    const recipeName = screen.findByText('Kumpir');
    waitFor(() => expect(recipeName).toBeInTheDocument());
  });

  test('se na página Meals, ao selecionar Firt Letter e digitar mais de uma letra, é emitido um alerta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFood),
    });

    renderWithRouter(
      <AppProvider>
        <Meals />
      </AppProvider>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    userEvent.click(buttons[0]);

    const nameBtn = screen.getByTestId('first-letter-search-radio');
    expect(nameBtn).toBeInTheDocument();
    userEvent.click(nameBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Ku');

    const alert = screen.findByText('Your search must have only 1 (one) character');
    expect(alert).toBeInTheDocument();
  });
});
