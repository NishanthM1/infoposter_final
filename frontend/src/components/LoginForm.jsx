import React, { useState } from 'react';
import { login } from '../services/api';

const LoginForm = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength="6"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <input type="submit" value="login" />
      <button type="button" className="link-button" onClick={onSwitchToRegister}>
        click here to create account
      </button>
      <p>demo email: nshanth@1234</p>
      <p>password:123456</p>
    </form>
  );
};

export default LoginForm;
