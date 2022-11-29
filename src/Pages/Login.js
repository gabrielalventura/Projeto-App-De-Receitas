import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { user } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'email':
        console.log('acessou email')
        setEmail(value)
        break;
      case 'password':
        console.log('acessou password')
        setPassword(value)
        break;
      default:
        break;
    }
  };
  

  return (
    <div>
      <form>
        <input name="email" type="email" data-testid="email-input" value={ email } onChange={ handleChange } />
        <input name="password" type="password" data-testid="password-input" value={ password } onChange={ handleChange } />
        <button type="button" data-testid="login-submit-btn">Enter</button>
      </form>
    </div>
  );
}

export default Login;
