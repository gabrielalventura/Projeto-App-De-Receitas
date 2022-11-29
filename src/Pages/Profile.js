import React from 'react';

function Profile() {
  const userEmail = localStorage.getItem('user'); // userEmail é uma chave hipótetica, checar como o login será feito
  return (
    <div>
      <div>Profile</div>
      <h2 data-testid="profile-email">{userEmail}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        // onClick={ handleDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        // onClick={ handleFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        // onClick={ handleLogout }
      >
        Logout
      </button>
    </div>

  );
}

export default Profile;
