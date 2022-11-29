import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DoneRecipes from './Pages/DoneRecipes';
import Drinks from './Pages/Drinks';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default Routes;
