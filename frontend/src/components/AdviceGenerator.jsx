import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Advice from './Advice.jsx';
import './AdviceGenerator.scss';

const AdviceGenerator = ({ currentAdvice, userId, setCurrentAdvice }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userId === null ? navigate('/login') : null;
    if (!localStorage.getItem('advice')) {
      if (!generateAdvice()) {
        console.log('Failed to generate advice');
      }
    } else {
      setCurrentAdvice([JSON.parse(localStorage.getItem('advice'))]);
    }
  }, []);

  const generateAdviceFetch = async () => {
    try {
      const adviceFetchResponse = await fetch(
        'https://api.adviceslip.com/advice'
      );
      if (!adviceFetchResponse.ok) {
        throw new Error(adviceFetchResponse.statusText);
      }
      const advice = await adviceFetchResponse.json();
      return advice.slip;
    } catch (error) {
      console.error(error);
    }
  };

  const generateAdvice = async () => {
    setIsLoading(true);

    try {
      const generatedAdvice = await generateAdviceFetch();
      if (!generateAdvice) {
        throw new error('Error generating advice');
      }
      setCurrentAdvice([generatedAdvice]);
      localStorage.setItem('advice', JSON.stringify(generatedAdvice));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    generateAdvice();
  };

  return (
    <div className="generator">
      {currentAdvice !== null
        ? currentAdvice.map((advice, index) => {
            return (
              <Advice
                key={index}
                advice={advice}
                isLoading={isLoading}
                handleOnClick={handleOnClick}
              />
            );
          })
        : null}
    </div>
  );
};

export default AdviceGenerator;
