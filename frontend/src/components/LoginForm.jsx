import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoEye, IoEyeOff } from 'react-icons/io5';
import { RiLoginCircleLine } from 'react-icons/ri';

import loader from './../assets/loader.svg';
import './LoginForm.scss';

const LoginForm = ({
  isLoading,
  handleOnChange,
  handleOnBlur,
  handleSubmit,
}) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const handleClickOnEye = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  return (
    <>
      <form action="POST" className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Login</h1>
        <input
          type="text"
          name="email"
          className="login-form__input-text"
          placeholder="email@email.com"
          autoFocus
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />

        <div className="login-form__password-container">
          {passwordIsVisible ? (
            <>
              <input
                type="text"
                name="password"
                className="login-form__input-password"
                placeholder="password"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
              <IoEyeOff
                className="login-form__eye-icon"
                onClick={handleClickOnEye}
              />
            </>
          ) : (
            <>
              <input
                type="password"
                name="password"
                className="login-form__input-password"
                placeholder="password"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
              <IoEye
                className="login-form__eye-icon"
                onClick={handleClickOnEye}
              />
            </>
          )}
        </div>

        <button
          className="login-form__submit-btn"
          disabled={isLoading === true}
        >
          {isLoading ? (
            <img src={loader} alt="loader" />
          ) : (
            <RiLoginCircleLine className="login-form__btn-icon" />
          )}
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
