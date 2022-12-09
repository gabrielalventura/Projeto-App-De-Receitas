import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import mockMealsTest from './helpers/mockMealInProgress';
import mockDrinkTest from './helpers/mockDrinkInProgress';
import App from '../App';
import AppProvider from '../context/AppProvider';
import { mockFavoriteMeal, mockFavoriteDrink } from './helpers/mockFavoriteRecipes';

const iconContainer = 'icon-container';
const whiteHeart = 'whiteHeartIcon.svg';
const mealsEndPoint = '/meals/52771/in-progress';
const SAVED_INGREDITES = [
  {
    id: '52771',
    ingredient: '1 pound penne rigate',
  },
  {
    id: '52771',
    ingredient: '1/4 cup olive oil',
  },
];

describe('Realiza testes na página de receitas em progresso quando acessa uma comida', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTest),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('1- testando se a rota /meals/52771/in-progress conteḿ as informações necessárias', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(mealsEndPoint);
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
    const favoriteBtn = screen.getByTestId(iconContainer);
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
    expect(favoriteIcon).toHaveAttribute('src', whiteHeart);
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredientsCheck[0]).toBeInTheDocument();
    expect(ingredientsCheck.length).toBe(8);
    expect(ingredientsCheck[0]).not.toBeChecked();
    expect(ingredientsLabel).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });
  it('2- testando se a rota /drinks/178319/in-progress conteḿ as informações necessárias', async () => {
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkTest),
    });

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/drinks/178319/in-progress');
    });

    expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${178319}`);

    const title = screen.getByText('Recipe In Progress');
    expect(title).toBeInTheDocument();
    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeName = screen.getByRole('heading', { level: 3 });
    const shareBtn = screen.getByRole('button', { name: /share/i });
    const favoriteBtn = screen.getByTestId(iconContainer);
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
    expect(favoriteIcon).toHaveAttribute('src', whiteHeart);
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredientsCheck[0]).toBeInTheDocument();
    expect(ingredientsCheck.length).toBe(3);
    expect(ingredientsCheck[0]).not.toBeChecked();
    expect(ingredientsLabel).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });
});
describe('Testando a funcionalidade do botão favoritar', () => {
  it('1- Quando for uma comida em progresso', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTest),
    });

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(mealsEndPoint);
    });

    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52771}`);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const favoriteBtn = screen.getByTestId(iconContainer);
    const favoriteIcon = screen.getByAltText('favorite');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', whiteHeart);
    const prevLocalStorage = localStorage.getItem('favoriteRecipes');
    expect(prevLocalStorage).toBe(null);

    userEvent.click(favoriteIcon);
    expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg');
    const afterLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(afterLocalStorage.length).toBe(1);
    expect(afterLocalStorage[0]).toEqual(mockFavoriteMeal);

    userEvent.click(favoriteIcon);
    expect(favoriteIcon).toHaveAttribute('src', whiteHeart);
    const afterLocalStorage2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(afterLocalStorage2.length).toBe(0);

    userEvent.click(favoriteIcon);
    const afterLocalStorage3 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(afterLocalStorage3.length).toBe(1);
    expect(afterLocalStorage3[0]).toEqual(mockFavoriteMeal);

    jest.restoreAllMocks();
  });
  it('2- testando se a rota /drinks/178319/in-progress conteḿ as informações necessárias', async () => {
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkTest),
    });

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/drinks/178319/in-progress');
    });
    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const favoriteIcon = screen.getByAltText('favorite');
    expect(favoriteIcon).toHaveAttribute('src', whiteHeart);
    const prevLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(prevLocalStorage.length).toBe(1);

    userEvent.click(favoriteIcon);
    expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg');
    const afterLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(afterLocalStorage.length).toBe(2);
    expect(afterLocalStorage[1]).toEqual(mockFavoriteDrink);
  });
});

describe('Testando o checkbox de ingredientes', () => {
  it('1- Verifica se ao carregar o checkbox não está checkado e após clicar muda seu status e o texto de sua label é riscado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTest),
    });

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(mealsEndPoint);
    });

    const INITIAL_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // const EMPTY_INPROGRESS = { drinks: [], meals: [] };
    expect(INITIAL_LOCALSTORAGE).toBe(null);

    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52771}`);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const loadingIngredients = screen.getAllByText('loading');
    await waitForElementToBeRemoved(loadingIngredients[0]);
    expect(loadingIngredients[0]).not.toBeInTheDocument();
    const checkboxes = screen.getAllByTestId('ingredient-checkbox');
    expect(checkboxes.length).toBe(8);
    const ingredientLabel = screen.getByTestId('0-ingredient-step');
    expect(ingredientLabel).toHaveTextContent('1 pound penne rigate');
    expect(ingredientLabel).toHaveAttribute('class', 'ingredients-label-false');

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(ingredientLabel).toHaveAttribute('class', 'ingredients-label-true');
    const AFTER_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(AFTER_LOCALSTORAGE.meals.length).toBe(2);
    expect(AFTER_LOCALSTORAGE.meals[0]).toEqual(SAVED_INGREDITES[0]);
    expect(AFTER_LOCALSTORAGE.meals[1]).toEqual(SAVED_INGREDITES[1]);

    userEvent.click(checkboxes[0]);
    const AFTER_LOCALSTORAGE2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(AFTER_LOCALSTORAGE2.meals.length).toBe(1);
    expect(AFTER_LOCALSTORAGE2.meals[0]).toEqual(SAVED_INGREDITES[1]);
  });
});
