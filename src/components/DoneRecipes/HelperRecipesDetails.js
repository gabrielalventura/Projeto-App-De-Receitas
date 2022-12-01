export const convertAndFindObject = (string, drinkOrMealsFetch, drinkOrMeals) => {
  if (drinkOrMeals === 'drink') {
    const seven = 7;
    const convertUrlDrink = string.slice(seven);
    const findDrinkById = drinkOrMealsFetch
      .find((drink) => drink.idDrink === convertUrlDrink);
    return findDrinkById;
  }
  if (drinkOrMeals === 'meal') {
    const five = 5;
    const convertUrlMeal = string.slice(five);
    const findMealById = drinkOrMealsFetch
      .find((meal) => meal.idDrink === convertUrlMeal);
    return findMealById;
  }
};

export const verifyUrl = (urlLocation, drinkOrFood) => (
  !!urlLocation.includes(drinkOrFood)
);
