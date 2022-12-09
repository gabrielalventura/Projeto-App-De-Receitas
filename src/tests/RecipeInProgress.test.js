import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import mockMeals from './helpers/mockMealInProgress';
// import mockDrinks from './helpers/mockDrinkInProgress';
import App from '../App';
import AppProvider from '../context/AppProvider';

describe('Realiza testes na página de receitas em progresso quando acessa uma comida', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMeals),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('testando se a rota /meals/52771/in-progress conteḿ as informações necessárias', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/meals/52771/in-progress');
    });

    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52771}`);

    const title = screen.getByText('Recipe In Progress');
    expect(title).toBeInTheDocument();
    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeName = screen.getByRole('heading', { level: 3 });
    const shareBtn = screen.getByRole('button', { name: /share/i });
    const favoriteBtn = screen.getByTestId('icon-container');
    const favoriteIcon = screen.getByAltText('favorite');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredientsCheck = await screen.findAllByRole('checkbox');
    const ingredientsLabel = screen.getByTestId('0-ingredient-step');
    const recipeInstructions = screen.getByTestId('instructions');
    const finishBtn = screen.getByRole('button', { name: 'Finish' });

    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', 'whiteHeartIcon.svg');
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredientsCheck[0]).toBeInTheDocument();
    expect(ingredientsCheck.length).toBe(8);
    expect(ingredientsCheck[0]).not.toBeChecked();
    expect(ingredientsLabel).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });
});
