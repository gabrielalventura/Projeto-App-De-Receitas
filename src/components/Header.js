import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <nav>
      <Link to="/profile">
        <img
          alt="profileIcon"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </Link>
      {
        (title === 'Meals' || title === 'Drinks')
        && (
          <img
            alt="searchIcon"
            data-testid="search-top-btn"
            src={ searchIcon }
          />
        )
      }
      <h2 data-testid="page-title">{ title }</h2>
    </nav>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
