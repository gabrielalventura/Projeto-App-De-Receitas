import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
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
const ingredient2Meals = '1/4 cup olive oil';
const ingredient1Drinks = '2 oz Hpnotiq';
const ingredient2Drinks = '1 oz Pineapple Juice';
const frinstLabel = '0-ingredient-step';
const checkBoxTestId = 'ingredient-checkbox';
const classLabelFalse = 'ingredients-label-false';
const classLabelTrue = 'ingredients-label-true';
// const mockLocalStorage = {
//   drinks: {
//     17222: [
//       '1 3/4 shot  Gin',
//       '1 Shot  Grand Marnier',
//     ],
//     178319: [
//       '2 oz Hpnotiq',
//       '1 oz Pineapple Juice',
//     ],
//   },
//   meals: {
//     52771: [
//       '1/4 cup olive oil',
//       ingredient1Meals,
//     ],
//     52977: [
//       '1 cup  Lentils',
//       '1 large Onion',
//     ],
//   },
// };

const DONE_RECIPES = [
  {
    id: '52771',
    nationality: 'Italian',
    name: 'Spicy Arrabiata Penne',
    category: 'Vegetarian',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    tags: [
      'Pasta',
      'Curry',
    ],
    alcoholicOrNot: '',
    type: 'meal',
    doneDate: '2022-12-10T10:00:00.100Z',
  },
  {
    id: '178319',
    nationality: '',
    name: 'Aquamarine',
    category: 'Cocktail',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    tags: [],
    alcoholicOrNot: 'Alcoholic',
    type: 'drink',
    doneDate: '2022-12-10T10:00:00.100Z',
  },
];

const finishTestId = 'finish-recipe-btn';

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
    const favoriteIcon = await screen.findByAltText('favorite');
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
    const favoriteIcon = await screen.findByAltText('favorite');
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
    const favoriteIcon = await screen.findByAltText('favorite');
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

    const favoriteIcon = await screen.findByAltText('favorite');
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

    expect(AFTER_LOCALSTORAGE.meals[52771].length).toBe(2);
    expect(AFTER_LOCALSTORAGE.meals[52771]).toContain(ingredient1Meals);
    expect(AFTER_LOCALSTORAGE.meals[52771]).toContain(ingredient2Meals);

    userEvent.click(checkboxes[0]);
    const AFTER_LOCALSTORAGE2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(AFTER_LOCALSTORAGE2.meals[52771].length).toBe(1);
    expect(AFTER_LOCALSTORAGE2.meals[52771]).toContain(ingredient2Meals);
    const result1 = AFTER_LOCALSTORAGE2.meals[52771].includes(ingredient1Meals);
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
    expect(ingredientLabel).toHaveTextContent(ingredient1Drinks);
    expect(ingredientLabel).toHaveAttribute('class', classLabelFalse);

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(ingredientLabel).toHaveAttribute('class', classLabelTrue);
    const AFTER_LOCALSTORAGE = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(AFTER_LOCALSTORAGE.drinks[178319].length).toBe(2);
    expect(AFTER_LOCALSTORAGE.drinks[178319]).toContain(ingredient1Drinks);
    expect(AFTER_LOCALSTORAGE.drinks[178319]).toContain(ingredient2Drinks);

    userEvent.click(checkboxes[0]);
    const AFTER_LOCALSTORAGE2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(AFTER_LOCALSTORAGE2.drinks[178319].length).toBe(1);
    expect(AFTER_LOCALSTORAGE2.drinks[178319]).toContain(ingredient2Drinks);
    const result1 = AFTER_LOCALSTORAGE2.drinks[178319].includes(ingredient1Drinks);
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
    const storedMeals = INITIAL_LOCALSTORAGE.meals[52771];
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
    expect(ingredientLabel2).toHaveTextContent(ingredient2Meals);
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
    const storedDrinks = INITIAL_LOCALSTORAGE.drinks[178319];
    expect(storedDrinks.length).toBe(1);

    const loading = screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    expect(checkboxes.length).toBe(3);
    const ingredientLabel = screen.getByTestId(frinstLabel);
    expect(ingredientLabel).toHaveTextContent(ingredient1Drinks);
    expect(ingredientLabel).toHaveAttribute('class', classLabelFalse);
    const ingredientLabel2 = screen.getByTestId('1-ingredient-step');
    expect(ingredientLabel2).toHaveTextContent(ingredient2Drinks);
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

describe('Testando o botão Finish', () => {
  it('1- Verifica se o botão finish inicia desabilitado e somente é habilitando quando todos os ingredientes estiverem checados, para comidas', async () => {
    localStorage.clear();

    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTest),
    });

    // https://pt.stackoverflow.com/questions/480115/como-aplicar-mock-no-new-date-utilizando-o-jest
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11, 10, 7));

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

    const finishBtn = screen.getByTestId(finishTestId);
    expect(finishBtn).toBeDisabled();
    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[1]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[2]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[3]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[4]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[5]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[6]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[7]);
    await waitFor(() => {
      expect(finishBtn).not.toBeDisabled();
    });
    userEvent.click(finishBtn);
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(storedDoneRecipes).not.toBe(null);
    expect(storedDoneRecipes.length).toBe(1);
    expect(storedDoneRecipes[0]).toEqual(DONE_RECIPES[0]);

    expect(history.location.pathname).toBe('/done-recipes');

    act(() => {
      history.push(mealsEndPoint);
    });

    const loading2 = screen.getByRole('heading', { name: /loading/i });
    expect(loading2).toBeInTheDocument();
    await waitForElementToBeRemoved(loading2);
    expect(loading2).not.toBeInTheDocument();

    const checkboxes2 = screen.getAllByTestId(checkBoxTestId);
    expect(checkboxes2[0]).toBeChecked();
    const finishBtn2 = screen.getByTestId(finishTestId);
    expect(finishBtn2).not.toBeDisabled();

    userEvent.click(finishBtn2);
    const storedDoneRecipes2 = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(storedDoneRecipes2).not.toBe(null);
    expect(storedDoneRecipes2.length).toBe(1);
    expect(storedDoneRecipes2[0]).toEqual(DONE_RECIPES[0]);
  });
  it('2- Verifica se o botão finish adiciona uma comida ao localStorage conservando receitas feitas anteriormente', async () => {
    localStorage.clear();
    const startStorage = [DONE_RECIPES[1]];
    localStorage.setItem('doneRecipes', JSON.stringify(startStorage));
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTest),
    });

    // https://pt.stackoverflow.com/questions/480115/como-aplicar-mock-no-new-date-utilizando-o-jest
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11, 10, 7));

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

    const finishBtn = screen.getByTestId(finishTestId);
    expect(finishBtn).toBeDisabled();
    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[1]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[2]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[3]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[4]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[5]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[6]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[7]);
    await waitFor(() => {
      expect(finishBtn).not.toBeDisabled();
    });
    userEvent.click(finishBtn);
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(storedDoneRecipes).not.toBe(null);
    expect(storedDoneRecipes.length).toBe(2);
    expect(storedDoneRecipes[0]).toEqual(DONE_RECIPES[1]);
    expect(storedDoneRecipes[1]).toEqual(DONE_RECIPES[0]);
  });
  it('3- Verifica se o botão finish inicia desabilitado e somente é habilitando quando todos os ingredientes estiverem checados, para bebidas', async () => {
    localStorage.clear();

    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkTest),
    });

    // https://pt.stackoverflow.com/questions/480115/como-aplicar-mock-no-new-date-utilizando-o-jest
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11, 10, 7));

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

    const finishBtn = screen.getByTestId(finishTestId);
    expect(finishBtn).toBeDisabled();
    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[1]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[2]);
    await waitFor(() => {
      expect(finishBtn).not.toBeDisabled();
    });
    userEvent.click(finishBtn);
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(storedDoneRecipes).not.toBe(null);
    expect(storedDoneRecipes.length).toBe(1);
    expect(storedDoneRecipes[0]).toEqual(DONE_RECIPES[1]);

    expect(history.location.pathname).toBe('/done-recipes');

    act(() => {
      history.push(drinksEndPoint);
    });

    const loading2 = screen.getByRole('heading', { name: /loading/i });
    expect(loading2).toBeInTheDocument();
    await waitForElementToBeRemoved(loading2);
    expect(loading2).not.toBeInTheDocument();

    const checkboxes2 = screen.getAllByTestId(checkBoxTestId);
    expect(checkboxes2[0]).toBeChecked();
    const finishBtn2 = screen.getByTestId(finishTestId);
    expect(finishBtn2).not.toBeDisabled();

    userEvent.click(finishBtn2);
    const storedDoneRecipes2 = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(storedDoneRecipes2).not.toBe(null);
    expect(storedDoneRecipes2.length).toBe(1);
    expect(storedDoneRecipes2[0]).toEqual(DONE_RECIPES[1]);
  });
  it('4- Verifica se o botão finish adiciona uma bebida ao localStorage conservando receitas feitas anteriormente', async () => {
    localStorage.clear();
    const startStorage = [DONE_RECIPES[0]];
    localStorage.setItem('doneRecipes', JSON.stringify(startStorage));
    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkTest),
    });

    // https://pt.stackoverflow.com/questions/480115/como-aplicar-mock-no-new-date-utilizando-o-jest
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11, 10, 7));

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

    const finishBtn = screen.getByTestId(finishTestId);
    expect(finishBtn).toBeDisabled();
    const checkboxes = await screen.findAllByTestId(checkBoxTestId);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[1]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(checkboxes[2]);
    await waitFor(() => {
      expect(finishBtn).not.toBeDisabled();
    });
    userEvent.click(finishBtn);
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(storedDoneRecipes).not.toBe(null);
    expect(storedDoneRecipes.length).toBe(2);
    expect(storedDoneRecipes[0]).toEqual(DONE_RECIPES[0]);
    expect(storedDoneRecipes[1]).toEqual(DONE_RECIPES[1]);
  });
});
