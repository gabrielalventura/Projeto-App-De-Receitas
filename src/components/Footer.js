import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <img
        className="footer-icons"
        src={ drinkIcon }
        alt="Drink-icon"
        data-testid="drinks-bottom-btn"
      />
      <img
        className="footer-icons"
        src={ mealIcon }
        alt="Meal-icon"
        data-testid="meals-bottom-btn"
      />
    </footer>
  );
}

export default Footer;
