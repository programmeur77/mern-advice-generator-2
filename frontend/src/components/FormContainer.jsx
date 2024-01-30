import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './FormContainer.scss';

const FormContainer = ({ setUserId, setCurrentAdvice }) => {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="form-container">
      {location.pathname === '/login' ? (
        <LoginForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setUserId={setUserId}
          setCurrentAdvice={setCurrentAdvice}
        />
      ) : (
        <RegisterForm />
      )}
    </div>
  );
};

export default FormContainer;
