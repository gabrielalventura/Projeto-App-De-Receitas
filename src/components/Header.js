import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <nav>
      <img
        alt="profileIcon"
        data-testid="profile-top-btn"
        src={ profileIcon }
      />
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
