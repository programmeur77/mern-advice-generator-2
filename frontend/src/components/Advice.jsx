import React from 'react';

import { FaDiceFive } from 'react-icons/fa';

import dividerDesktop from './../assets/pattern-divider-desktop.svg';
import dividerMobile from './../assets/pattern-divider-mobile.svg';
import loader from './../assets/loader.svg';

import './Advice.scss';

const Advice = ({ advice, isLoading, handleOnClick }) => {
  return (
    <>
      <div className="advice-container">
        <p className="advice__advice-number">Advice #{advice.id}</p>
        <p className="advice__advice-content">&ldquo;{advice.advice}&rdquo;</p>

        <picture className="advice__separator">
          <source
            media="(max-width: 900)"
            srcSet={dividerMobile}
            alt="Mobile divider image"
          />
          <img src={dividerDesktop} alt="Desktop divider image" />
        </picture>

        <button
          className="advice__generate-advice-btn"
          disabled={isLoading === true}
          onClick={handleOnClick}
        >
          {isLoading ? (
            <img src={loader} alt="Loader image"></img>
          ) : (
            <FaDiceFive className="advice__generate-advice-icon" />
          )}
        </button>
      </div>
    </>
  );
};

export default Advice;
