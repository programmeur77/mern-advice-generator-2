import React from 'react';
import { Link } from 'react-router-dom';

import { IoEye } from 'react-icons/io5';
import { RiLoginCircleLine } from 'react-icons/ri';

import './LoginForm.scss';

const LoginForm = () => {
  return (
    <>
      <form action="POST" className="login-form">
        <h1 className="login-form__title">Login</h1>
        <input
          type="text"
          name="email"
          className="login-form__input-text"
          placeholder="email@email.com"
          autofocus
        />

        <div className="login-form__password-container">
          <input
            type="password"
            name="password"
            className="login-form__input-password"
            placeholder="password"
          />
          <IoEye className="login-form__eye-icon" />
        </div>

        <button className="login-form__submit-btn">
          <RiLoginCircleLine className="login-form__btn-icon" />
        </button>

        <div className="form-links">
          <Link to="forgotten-password" className="form-links__link-item">
            Password Forgotten ?
          </Link>
          |
          <Link to="/register" className="form-links__link-item">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
