import React, { useState } from 'react';
import { register } from '../services/api';

const RegisterForm = ({ onSwitchToLogin, onRegisterSuccess, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true); // Set isAuthenticated to true on successful registration
      onRegisterSuccess();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">user name :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
      </div>
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
      <input type="submit" value="Register" />
      <button type="button" className="link-button" onClick={onSwitchToLogin}>
        Already have an account? Login
      </button>
    </form>
  );
};

export default RegisterForm;
