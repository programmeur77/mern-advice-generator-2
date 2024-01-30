import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Advice from './Advice.jsx';
import './AdviceGenerator.scss';

const AdviceGenerator = ({ currentAdvice, userId, setCurrentAdvice }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const DATE_OF_TODAY = new Date().toLocaleDateString();

  useEffect(() => {
    userId === null ? navigate('/login') : null;
    if (currentAdvice === null && userId !== null) {
      generateAdvice();
    } else if (currentAdvice !== null && userId !== null) {
      compareDates(currentAdvice);
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

  const saveAdviceFetch = async (advice) => {
    try {
      const saveAdviceResponse = await fetch(
        `http://localhost:3000/api/advice/${userId}/updateAdvice`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(advice),
        }
      );

      if (!saveAdviceResponse.ok) {
        throw new Error('Failed to fetch advice');
      }

      const saveAdviceData = await saveAdviceResponse.json();
      return saveAdviceData;
    } catch (error) {
      console.error(error);
    }
  };

  const generateAdvice = async () => {
    setIsLoading(true);
    try {
      const advice = await generateAdviceFetch();
      if (!advice) {
        throw new Error('Impossible to generate advice');
      }
      setCurrentAdvice([advice]);
      saveCurrentAdvice(advice);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const saveCurrentAdvice = async (advice) => {
    const FormattedAdvice = {
      adviceId: advice.id,
      advice: advice.advice,
      generatedAt: new Date().toLocaleDateString(),
    };
    try {
      setIsLoading(true);
      const savedAdvice = await saveAdviceFetch(FormattedAdvice);
      if (!savedAdvice) {
        throw new Error('Impossible to save advice');
      }
      setIsLoading(false);
      return console.log(savedAdvice.advice);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const compareDates = (advice) => {
    advice.map((adviceItem) => {
      if (adviceItem.generatedAt !== DATE_OF_TODAY) {
        generateAdvice();
      }
    });
  };

  const handleOnClick = () => {
    generateAdvice();
  };

  return (
    <div className="generator">
      {currentAdvice !== null
        ? currentAdvice.map((advice) => {
            return (
              <Advice
                key={advice.id}
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
