import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <input
        type="radio"
        value="ingredient"
        name="ingredient"
        data-testid="ingredient-search-radio"
      />
      Ingredient
      <input
        type="radio"
        value="Name"
        name="name"
        data-testid="name-search-radio"
      />
      Name
      <input
        type="radio"
        value="First-Letter"
        name="first-letter"
        data-testid="first-letter-search-radio"
      />
      First Letter
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
