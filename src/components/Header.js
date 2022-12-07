import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';
import SearchBar from './SearchBar';

function Header({ title }) {
  const { isSrchActive, srchToggle } = useContext(AppContext);
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
          <button
            type="button"
            onClick={ srchToggle }
            style={ { border: 'none', backgroundColor: 'white' } }
          >
            <img
              alt="searchIcon"
              data-testid="search-top-btn"
              src={ searchIcon }
            />
          </button>
        )
      }
      { isSrchActive && <SearchBar />}
      <h2 data-testid="page-title">{ title }</h2>
    </nav>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
