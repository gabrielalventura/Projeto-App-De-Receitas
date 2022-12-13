export const converStrToId = (linkStr) => {
  const data = linkStr.replace(/[^\d]+/g, '');
  return data;
};

export const verifyUrl = (urlLocation, drinkOrFood) => (
  !!urlLocation.includes(drinkOrFood)
);

export const genericFetch = async (url, type) => {
  const response = await fetch(url);
  const data = await response.json();
  const six = 6;
  if (type === 'drink') return data.meals.slice(0, six);
  if (type === 'meal') return data.drinks.slice(0, six);

  return data;
};

export const filterMeasuresAndIngredients = (json, type) => {
  if (type === 'drink') {
    const filterDrinkIngredients = Object.keys(json.drinks[0])
      .filter((drink) => drink.includes('strIngredient')) || [];

    const filterDrinkMeasures = Object.keys(json.drinks[0])
      .filter((drink) => drink.includes('strMeasure')) || [];

    return [filterDrinkIngredients, filterDrinkMeasures];
  }
  if (type === 'meal') {
    const filterMealIngredients = Object.keys(json.meals[0])
      .filter((meal) => meal.includes('strIngredient'));

    const filterMealMeasures = Object.keys(json.meals[0])
      .filter((meal) => meal.includes('strMeasure'));

    return [filterMealIngredients, filterMealMeasures];
  }
};

export const filterDinamic = (array, json, type) => {
  if (type === 'drink') {
    const ingredientDinamic = array[0].map((ingredient) => json.drinks[0][ingredient]);
    const measuresDinamic = array[1].map((measure) => json.drinks[0][measure]);

    return [ingredientDinamic, measuresDinamic];
  }
  if (type === 'meal') {
    const ingredientMeals = array[0].map((ingredient) => json.meals[0][ingredient]);
    const measuresMeals = array[1].map((measures) => json.meals[0][measures]);

    return [ingredientMeals, measuresMeals];
  }
};

export const convertObjToPadronized = (type, json) => {
  if (type === 'drink') {
    const objectFinnalyDrink = {
      type: 'drink',
      drinks: true,
      title: json.drinks[0].strDrink,
      thumb: json.drinks[0].strDrinkThumb,
      instructions: json.drinks[0].strInstructions,
      id: json.drinks[0].idDrink,
      alcoholic: json.drinks[0].strAlcoholic,
      category: json.drinks[0].strCategory,
    };
    return objectFinnalyDrink;
  }
  const objectFinnalyMeal = {
    type: 'meal',
    meals: true,
    title: json.meals[0].strMeal,
    thumb: json.meals[0].strMealThumb,
    id: json.meals[0].idMeal,
    instructions: json.meals[0].strInstructions,
    alcoholic: '',
    area: json.meals[0].strArea,
  };
  return objectFinnalyMeal;
};
