import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { IoEye, IoEyeOff } from 'react-icons/io5';
import { RiLoginCircleLine } from 'react-icons/ri';

import loader from './../assets/loader.svg';
import './LoginForm.scss';

const LoginForm = ({
  isLoading,
  setUserId,
  setIsLoading,
  setCurrentAdvice,
}) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState([]);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);

  const navigate = useNavigate();

  const EMAIL_VALIDATION_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const loginFetch = async (user) => {
    try {
      const userResponse = await fetch(
        'http://localhost:3000/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );

      if (!userResponse.ok) {
        throw new Error('Impossible to login');
      }

      const userData = await userResponse.json();
      return userData;
    } catch (error) {
      setError(true);
    }
  };

  const postUser = async (emailValue, passwordValue) => {
    const NewUser = {
      email: emailValue,
      password: passwordValue,
    };
    setIsLoading(true);
    try {
      const userResponse = await loginFetch(NewUser);
      if (!userResponse) {
        throw new Error('Error in login');
      }
      if (userResponse.user.advice) {
        setCurrentAdvice([userResponse.user.advice]);
      }
      setIsLoading(false);
      setUserId(userResponse.user._id);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const setErrorMessage = (errorMessage) => {
    if (error.length > 0) {
      const filteredArray = error.filter((error) => error === errorMessage);
      if (filteredArray.length > 0) {
        return;
      }
      setError(error.push(errorMessage));
    }
    setError([errorMessage]);
  };

  const deleteErrorMessage = (errorMessage) => {
    const updatedErrorMessageArray = error.filter(
      (item) => item !== errorMessage
    );

    if (updatedErrorMessageArray.length === 0) {
      setError([]);
    }
    console.log(updatedErrorMessageArray);
  };

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailValue(e.target.value);
        break;
      case 'password':
        setPasswordValue(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleOnBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        if (emailValue !== '') {
          if (!EMAIL_VALIDATION_PATTERN.test(emailValue)) {
            setErrorMessage('Invalid email');
            e.target.style.borderBottom = '2px solid red';
          } else {
            deleteErrorMessage('Invalid email');
            e.target.style.borderBottom = '2px solid hsl(150, 100%, 66%)';
          }
        } else if (emailValue === '') {
          setErrorMessage('Email cannot be empty');
          e.target.style.borderBottom = '2px solid red';
        } else {
          deleteErrorMessage('Invalid email');
          e.target.style.borderBottom = '2px solid hsl(150, 100%, 66%)';
          setInputIsEmpty(false);
        }
        break;
      case 'password':
        if (passwordValue === '') {
          setErrorMessage('Password cannot be empty');
          e.target.style.borderBottom = '2px solid red';
          console.log(error);
        } else {
          deleteErrorMessage('Password cannot be empty');
          e.target.style.borderBottom = '2px solid hsl(150, 100%, 66%)';
          setInputIsEmpty(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error.length > 0) return;

    postUser(emailValue, passwordValue);
  };

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
          disabled={
            isLoading === true || error.length > 0 || inputIsEmpty === true
          }
        >
          {isLoading ? (
            <img src={loader} alt="loader" />
          ) : (
            <RiLoginCircleLine className="login-form__btn-icon" />
          )}
        </button>

        {error ?? <p className="login-form__error-content">{error}</p>}

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
