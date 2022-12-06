import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DoneRecipes from './Pages/DoneRecipes';
import Recipes from './Pages/Recipes';
import RecipesDetails from './components/RecipeDetails/RecipeDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/drinks/:id" component={ RecipesDetails } />
      <Route path="/meals/:id" component={ RecipesDetails } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
    </Switch>
  );
}

export default Routes;
