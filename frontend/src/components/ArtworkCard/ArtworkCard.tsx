import React from 'react';
import cn from 'classnames';
import './ArtworkCard.scss';
import { Artwork } from '../../types';
import { Link } from 'react-router-dom';
import paintingImage from '@/images/gallery/painting.jpg';
import sculptureImage from '@/images/gallery/sculpture.jpg';
import photographyImage from '@/images/gallery/photography.jpg';
import ceramicsImage from '@/images/gallery/ceramics.jpg';
import otherImage from '@/images/gallery/other.jpg';

const artworkImages: { [key: string]: string } = {
  painting: paintingImage,
  sculpture: sculptureImage,
  photography: photographyImage,
  ceramics: ceramicsImage,
  other: otherImage,
};

type Props = {
  artwork: Artwork;
};

export const ArtworkCard: React.FC<Props> = ({ artwork }) => {
  const { id, title, artist, type, price, availability } = artwork;

  const artworkImage = artworkImages[type];

  return (
    <Link to={`/artworks/${id}`} className="artwork-card">
      <div
        className={cn('artwork-card__content', {
          'artwork-card__content--not-available': !availability,
        })}
      >
        <div className="artwork-card__image-container">
          <img src={artworkImage} alt={title} className="artwork-card__image" />
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
    </Link>
  );
};
