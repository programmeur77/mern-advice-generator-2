import React from 'react';
import { useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './FormContainer.scss';

const FormContainer = () => {
  const location = useLocation();

  return (
    <div className="form-container">
      {location.pathname === '/login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default FormContainer;
