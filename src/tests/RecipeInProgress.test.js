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
const drinksEndPoint = '/drinks/178319/in-progress';
const ingredient1Meals = '1 pound penne rigate';
const ingredient1drinks = '2 oz Hpnotiq';
const frinstLabel = '0-ingredient-step';
const checkBoxTestId = 'ingredient-checkbox';
const classLabelFalse = 'ingredients-label-false';
const classLabelTrue = 'ingredients-label-true';
const SAVED_MEALS = [
  {
    id: '52771',
    ingredient: ingredient1Meals,
  },
  {
    id: '52771',
    ingredient: '1/4 cup olive oil',
  },
];

const SAVED_DRINKS = [
  {
    id: '178319',
    ingredient: ingredient1drinks,
  },
  {
    id: '178319',
    ingredient: '1 oz Pineapple Juice',
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
    const ingredientsLabel = screen.getByTestId(frinstLabel);
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
      history.push(drinksEndPoint);
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
    const ingredientsLabel = screen.getByTestId(frinstLabel);
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
  it('1- Verificar funcionamento do checkbox na página de comida em progresso', async () => {
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
    expect(INITIAL_LOCALSTORAGE).toBe(null);

    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52771}`);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const loadingIngredients = screen.getAllByText('loading');
    await waitForElementToBeRemoved(loadingIngredients[0]);
    expect(loadingIngredients[0]).not.toBeInTheDocument();
    const checkboxes = screen.getAllByTestId(checkBoxTestId);
    expect(checkboxes.length).toBe(8);
    const ingredientLabel = screen.getByTestId(frinstLabel);
    expect(ingredientLabel).toHaveTextContent(ingredient1Meals);
    expect(ingredientLabel).toHaveAttribute('class', classLabelFalse);

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(ingredientLabel).toHaveAttribute('class', classLabelTrue);
    const AFTER_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(AFTER_LOCALSTORAGE.meals.length).toBe(2);
    expect(AFTER_LOCALSTORAGE.meals[0]).toEqual(SAVED_MEALS[0]);
    expect(AFTER_LOCALSTORAGE.meals[1]).toEqual(SAVED_MEALS[1]);

    userEvent.click(checkboxes[0]);
    const AFTER_LOCALSTORAGE2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(AFTER_LOCALSTORAGE2.meals.length).toBe(1);
    expect(AFTER_LOCALSTORAGE2.meals[0]).toEqual(SAVED_MEALS[1]);
    const result1 = AFTER_LOCALSTORAGE2.meals.includes(SAVED_MEALS[0]);
    expect(result1).toBe(false);

    jest.clearAllMocks();
  });
  it('2- Verificar funcionamento do checkbox na página de bebida em progresso', async () => {
    // jest.restoreAllMocks();

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
      history.push(drinksEndPoint);
    });

    const INITIAL_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(INITIAL_LOCALSTORAGE).not.toBe(null);

    expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${178319}`);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    expect(checkboxes.length).toBe(3);
    const ingredientLabel = screen.getByTestId(frinstLabel);
    expect(ingredientLabel).toHaveTextContent(ingredient1drinks);
    expect(ingredientLabel).toHaveAttribute('class', classLabelFalse);

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(ingredientLabel).toHaveAttribute('class', classLabelTrue);
    const AFTER_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(AFTER_LOCALSTORAGE.drinks.length).toBe(2);
    expect(AFTER_LOCALSTORAGE.drinks[0]).toEqual(SAVED_DRINKS[0]);
    expect(AFTER_LOCALSTORAGE.drinks[1]).toEqual(SAVED_DRINKS[1]);

    userEvent.click(checkboxes[0]);
    const AFTER_LOCALSTORAGE2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(AFTER_LOCALSTORAGE2.drinks.length).toBe(1);
    expect(AFTER_LOCALSTORAGE2.drinks[0]).toEqual(SAVED_DRINKS[1]);
    const result1 = AFTER_LOCALSTORAGE2.drinks.includes(SAVED_MEALS[0]);
    expect(result1).toBe(false);

    jest.clearAllMocks();
  });

  it('3- Verifica se ao acessar novamente a página de comida, o ingrediente salvo ainda permanesse selecionado', async () => {
    jest.restoreAllMocks();

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
    expect(INITIAL_LOCALSTORAGE).not.toBe(null);
    const storedMeals = INITIAL_LOCALSTORAGE.meals;
    expect(storedMeals.length).toBe(1);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    expect(checkboxes.length).toBe(8);
    const ingredientLabel = screen.getByTestId(frinstLabel);
    expect(ingredientLabel).toHaveTextContent(ingredient1Meals);
    expect(ingredientLabel).toHaveAttribute('class', classLabelFalse);
    const ingredientLabel2 = screen.getByTestId('1-ingredient-step');
    expect(ingredientLabel2).toHaveTextContent('1/4 cup olive oil');
    expect(ingredientLabel2).toHaveAttribute('class', classLabelTrue);
  });
  it('4- Verifica se ao acessar novamente a página de bebida, o ingrediente salvo ainda permanesse selecionado', async () => {
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
      history.push(drinksEndPoint);
    });

    const INITIAL_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(INITIAL_LOCALSTORAGE).not.toBe(null);
    const storedDrinks = INITIAL_LOCALSTORAGE.drinks;
    expect(storedDrinks.length).toBe(1);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    expect(checkboxes.length).toBe(3);
    const ingredientLabel = screen.getByTestId(frinstLabel);
    expect(ingredientLabel).toHaveTextContent(ingredient1drinks);
    expect(ingredientLabel).toHaveAttribute('class', classLabelFalse);
    const ingredientLabel2 = screen.getByTestId('1-ingredient-step');
    expect(ingredientLabel2).toHaveTextContent('1 oz Pineapple Juice');
    expect(ingredientLabel2).toHaveAttribute('class', classLabelTrue);
  });
});

describe('Testes do componente de compartilhar receita', () => {
  it('1- Testa se ao clicar no botão Share na página de meals in progress', async () => {
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTest),
    });

    window.document.execCommand = jest.fn(() => true);

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(mealsEndPoint);
    });

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);

    const copiedText = screen.getByText('Link copied!');
    expect(copiedText).toBeInTheDocument();
  });
  it('2- Testa se ao clicar no botão Share na página de drinks in progress', async () => {
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkTest),
    });

    window.document.execCommand = jest.fn(() => true);

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(drinksEndPoint);
    });

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);

    const copiedText = screen.getByText('Link copied!');
    expect(copiedText).toBeInTheDocument();
  });
});
