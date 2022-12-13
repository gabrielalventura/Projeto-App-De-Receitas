import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';
import Meals from '../Pages/Meals';
import Drinks from '../Pages/Drinks';
import mockFood from './helpers/mockDataFoods';
import mockDrinks from './helpers/mockDataDrinks';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'exec-search-btn';
const FIRST_LETTER = 'first-letter-search-radio';
const SEARCH_MAGNIFYING_LENS = 'search-top-btn';

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

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

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

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const recipeName = screen.findByText('Kumpir');
    waitFor(() => expect(recipeName).toBeInTheDocument());
  });

  test('se na página Meals, ao selecionar First Letter, a busca na API é feita corretamente pela primeira letra', async () => {
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

    const nameBtn = screen.getByTestId(FIRST_LETTER);
    expect(nameBtn).toBeInTheDocument();
    userEvent.click(nameBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'K');

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const recipeName = screen.findByText('Kumpir');
    waitFor(() => expect(recipeName).toBeInTheDocument());
  });

  test('se na página Meals, ao selecionar First Letter e digitar mais de uma letra, é emitido um alerta', async () => {
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

    const nameBtn = screen.getByTestId(FIRST_LETTER);
    expect(nameBtn).toBeInTheDocument();
    userEvent.click(nameBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Ku');

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const alert = screen.findByText('Your search must have only 1 (one) character');
    waitFor(() => expect(alert).toBeInTheDocument());
  });

  test('se na página Drinks, ao selecionar Ingredients, a busca na API é feita corretamente pelo ingrediente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    renderWithRouter(
      <AppProvider>
        <Drinks />
      </AppProvider>,
    );

    const searchBtn = screen.getByTestId(SEARCH_MAGNIFYING_LENS);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const ingredientsBtn = screen.getByTestId('ingredient-search-radio');
    expect(ingredientsBtn).toBeInTheDocument();
    userEvent.click(ingredientsBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Pineapple Juice');

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const drink = screen.findByText('Aquamarine');
    waitFor(() => expect(drink).toBeInTheDocument());
  });

  test('se na página Drinks, ao selecionar Name, a busca na API é feita corretamente pelo nome do drink', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    renderWithRouter(
      <AppProvider>
        <Drinks />
      </AppProvider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const nameBtn = screen.getByTestId('name-search-radio');
    expect(nameBtn).toBeInTheDocument();
    userEvent.click(nameBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Aquamarine');

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const drink = screen.findByText('Aquamarine');
    waitFor(() => expect(drink).toBeInTheDocument());
  });

  test('se na página Drinks, ao selecionar First Letter, a busca na API é feita corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    renderWithRouter(
      <AppProvider>
        <Drinks />
      </AppProvider>,
    );

    const searchBtn = screen.getByTestId(SEARCH_MAGNIFYING_LENS);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const firstLetterBtn = screen.getByTestId(FIRST_LETTER);
    expect(firstLetterBtn).toBeInTheDocument();
    userEvent.click(firstLetterBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'A');

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const drink = screen.findByText('Aquamarine');
    waitFor(() => expect(drink).toBeInTheDocument());
  });

  test('se na página Drinks, ao selecionar First Letter e digitar mais de uma letra, aparece um alert', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    renderWithRouter(
      <AppProvider>
        <Drinks />
      </AppProvider>,
    );

    const searchBtn = screen.getByTestId(SEARCH_MAGNIFYING_LENS);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const firstLetterBtn = screen.getByTestId(FIRST_LETTER);
    expect(firstLetterBtn).toBeInTheDocument();
    userEvent.click(firstLetterBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Aq');

    const executeSearchBtn = screen.getByTestId(SEARCH_BUTTON);
    expect(executeSearchBtn).toBeInTheDocument();
    userEvent.click(executeSearchBtn);

    const alert = screen.findByText('Your search must have only 1 (one) character');
    waitFor(() => expect(alert).toBeInTheDocument());
  });
});
//   expect(global.fetch).toHaveBeenCalled();
//   expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
