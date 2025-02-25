import React from 'react';
import './SomethingWentWrong.scss';
import imgUrl from '../../images/page-not-found.png';

export const SomethingWentWrong: React.FC = () => (
  <div className="something-went-wrong">
    <img
      src={imgUrl}
      alt="something went wrong"
      className="something-went-wrong__image"
    />

    <h2 className="something-went-wrong__title">Something went wrong</h2>

    <button
      className="button something-went-wrong__button"
      type="button"
      aria-label="reload"
      onClick={() => window.location.reload()}
    >
      Reload
    </button>
  </div>
);
