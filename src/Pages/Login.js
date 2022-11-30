import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const validateForms = () => {
    let emailValidation = false;

    // the email validation was found at:
    // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex) && email.includes('.')) {
      emailValidation = true;
    } else {
      emailValidation = false;
    }

    const minLength = 7;

    if (emailValidation && password.length >= minLength) {
      setValid(true);
    } else {
      setValid(false);
    }

    // (emailValidation && password.length >= minLength) ? setValid(true) : setValid(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    // case 'password':
    //   setPassword(value);
    //   break;
    default:
      setPassword(value);
      break;
    }
  };

  useEffect(() => {
    validateForms();
  }, [email, password]);

  const history = useHistory();

  const handleClick = () => {
    setUser();
    history.push('/meals');
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div>
      <form>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleChange }
          placeholder="email"
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChange }
          placeholder="******"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !valid }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
