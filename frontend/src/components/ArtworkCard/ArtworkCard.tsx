import React from 'react';
import cn from 'classnames';
import './ArtworkCard.scss';
import { Artwork } from '../../types';

type Props = {
  artwork: Artwork;
};

export const ArtworkCard: React.FC<Props> = ({ artwork }) => {
  const { id, title, artist, type, price, availability, imageUrl } = artwork;

  return (
    <div className="artwork-card">
      <div
        className={cn('artwork-card__content', {
          'artwork-card__content--not-available': !availability,
        })}
      >
        <div className="artwork-card__image-container">
          <img src={imageUrl} alt={title} className="artwork-card__image" />
        </div>
        <p
          className={cn('artwork-card__price', {
            'artwork-card__price--not-available': !availability,
          })}
        >
          {price}
        </p>
        <p className="artwork-card__title">{title}</p>
        <p className="artwork-card__artist">{artist}</p>
        <p className="artwork-card__type">{type}</p>
      </div>
    </div>
  );
};
