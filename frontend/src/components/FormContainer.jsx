import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './FormContainer.scss';

const FormContainer = ({ setUserId, setCurrentAdvice }) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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
        if (e.target.value === '') {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 'password':
        if (e.target.value === '') {
          setError(true);
        } else {
          setError(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) return;

    postUser(emailValue, passwordValue);
  };

  return (
    <div className="form-container">
      {location.pathname === '/login' ? (
        <LoginForm
          isLoading={isLoading}
          handleOnChange={handleOnChange}
          handleOnBlur={handleOnBlur}
          handleSubmit={handleSubmit}
        />
      ) : (
        <RegisterForm />
      )}
    </div>
  );
};

export default FormContainer;
