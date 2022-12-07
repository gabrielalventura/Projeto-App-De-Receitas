export const converStrToId = (linkStr) => {
  const data = linkStr.replace(/[^\d]+/g, '');
  return data;
};

export const verifyUrl = (urlLocation, drinkOrFood) => (
  !!urlLocation.includes(drinkOrFood)
);
