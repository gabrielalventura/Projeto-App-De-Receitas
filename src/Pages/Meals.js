import React from 'react';
import useFetch from '../hooks/useFetch';

function Meals() {
  const { data } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  console.log(data);
  return (
    <div>Meals</div>
  );
}

export default Meals;
