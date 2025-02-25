import { useState } from 'react';
import { Artwork, ArtworkType } from '../../types';
import classNames from 'classnames';
import './ArtworkForm.scss';

type Props = {
  artwork?: Artwork | null;
  onSubmit: (artwork: Omit<Artwork, 'id'>) => void;
  onCancel: () => void;
};

export const ArtworkForm: React.FC<Props> = ({
  artwork,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(artwork?.title || '');
  const [artist, setArtist] = useState(artwork?.artist || '');
  const [type, setType] = useState(artwork?.type || ArtworkType.Other);
  const [price, setPrice] = useState(artwork?.price || '');
  const [availability, setAvailability] = useState<boolean>(
    artwork?.availability || true,
  );

  const [touched, setTouched] = useState({
    title: false,
    artist: false,
    price: false,
  });

  const validate = () => {
    return {
      title: !title.trim()
        ? 'Title is required'
        : title.length > 99
          ? 'Title cannot exceed 99 characters'
          : '',
      artist: !artist.trim()
        ? 'Artist is required'
        : artist.length > 50
          ? 'Artist name cannot exceed 50 characters'
          : '',
      price:
        isNaN(Number(price)) || Number(price) <= 0 ? 'Price is required' : '',
    };
  };

  const errors = validate();
  const isFormValid = !Object.values(errors).some(error => error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setTouched({ title: true, artist: true, price: true });
      return;
    }

    onSubmit({ title, artist, type, price: Number(price), availability });
  };

  return (
    <div className="artwork-form">
      <div className="artwork-form__content">
        <h2 className="artwork-form__title">
          {artwork ? 'Edit artwork' : 'Add new artwork'}
        </h2>

        <form onSubmit={handleSubmit} className="artwork-form__form">
          <div className="artwork-form__field">
            <label htmlFor="title" className="artwork-form__label">
              Title *
            </label>

            <input
              className={classNames('artwork-form__input', {
                'artwork-form__input-danger': touched.title && errors.title,
              })}
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={() => setTouched({ ...touched, title: true })}
              maxLength={99}
              required
            />

            {touched.title && errors.title && (
              <p className="artwork-form__error">{errors.title}</p>
            )}
          </div>

          <div className="artwork-form__field">
            <label htmlFor="artist" className="artwork-form__label">
              Artist *
            </label>

            <input
              className={classNames('artwork-form__input', {
                'artwork-form__input-danger': touched.artist && errors.artist,
              })}
              id="artist"
              type="text"
              value={artist}
              onChange={e => setArtist(e.target.value)}
              onBlur={() => setTouched({ ...touched, artist: true })}
              maxLength={50}
              required
            />

            {touched.artist && errors.artist && (
              <p className="artwork-form__error">{errors.artist}</p>
            )}
          </div>

          <div className="artwork-form__field">
            <label htmlFor="type" className="artwork-form__label">
              Type *
            </label>

            <select
              className="artwork-form__select"
              id="type"
              value={type}
              onChange={e => setType(e.target.value as ArtworkType)}
            >
              {Object.values(ArtworkType).map(artType => (
                <option key={artType} value={artType}>
                  {artType.charAt(0).toUpperCase() + artType.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="artwork-form__field">
            <label htmlFor="price" className="artwork-form__label">
              Price, $ *
            </label>

            <input
              className={classNames('artwork-form__input', {
                'artwork-form__input-danger': touched.price && errors.price,
              })}
              id="price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              onBlur={() => setTouched({ ...touched, price: true })}
              min={1}
              required
            />

            {touched.price && errors.price && (
              <p className="artwork-form__error">{errors.price}</p>
            )}
          </div>

          <div className="artwork-form__field">
            <input
              className="artwork-form__checkbox"
              id="availability"
              type="checkbox"
              checked={availability}
              onChange={e => setAvailability(e.target.checked as boolean)}
            />

            <label
              htmlFor="availability"
              className="artwork-form__label-checkbox"
            >
              Available for sale
            </label>
          </div>

          <div className="artwork-form__buttons">
            <button
              type="submit"
              className="button button--primary artwork-form__submit-button "
              disabled={!isFormValid}
            >
              {artwork ? 'Update' : 'Add'}
            </button>

            <button type="button" className="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
