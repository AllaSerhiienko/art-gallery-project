import { useEffect, useState } from 'react';
import './ArtworkDetailsPage.scss';
import { Artwork } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteArtwork,
  getArtworkDetails,
  updateArtwork,
} from '../../api/artworks';
import { SomethingWentWrong } from '../../components/SomethingWentWrong';
import { Loader } from '../../components/Loader';
import paintingImage from '@/images/gallery/painting.jpg';
import sculptureImage from '@/images/gallery/sculpture.jpg';
import photographyImage from '@/images/gallery/photography.jpg';
import ceramicsImage from '@/images/gallery/ceramics.jpg';
import otherImage from '@/images/gallery/other.jpg';
import { ArtworkForm } from '../../components/ArtworkForm';

const artworkImages: { [key: string]: string } = {
  painting: paintingImage,
  sculpture: sculptureImage,
  photography: photographyImage,
  ceramics: ceramicsImage,
  other: otherImage,
};

export const ArtworkDetailsPage = () => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { artworkId } = useParams();
  const navigate = useNavigate();

  const artworkImage = artwork ? artworkImages[artwork.type] : otherImage;

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);

    if (artworkId) {
      getArtworkDetails(artworkId)
        .then(setArtwork)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [artworkId]);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleRemove = () => {
    setIsLoading(true);
    if (artworkId) {
      deleteArtwork(artworkId)
        .catch(() => setIsError(true))
        .finally(() => {
          setIsLoading(false);
          navigate('/');
        });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = (updatedArtwork: Omit<Artwork, 'id'>) => {
    if (artworkId) {
      setIsLoading(true);

      updateArtwork(artworkId, updatedArtwork)
        .then(newArtwork => {
          setArtwork(newArtwork);
          setIsEditing(false);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError && !isLoading) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="artwork-details-page">
      <button
        type="button"
        className="artwork-details-page__back"
        onClick={goBack}
      >
        <div className="icon icon--arrow-left" />

        <p className="artwork-details-page__back-text">Back</p>
      </button>

      {isEditing && (
        <div className="artwork-details-page__form">
          <ArtworkForm
            artwork={artwork}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {!isEditing && (
        <div className="artwork-details-page__content">
          <div className=" artwork-details-page__content grid grid--tablet">
            <div className="grid__item grid__item--tablet-1-6 grid__item--desktop-1-12">
              <div className="artwork-details-page__image-container">
                <img
                  src={artworkImage}
                  alt={artwork?.title}
                  className="artwork-details-page__image"
                />
              </div>
            </div>

            <div className="grid__item grid__item--tablet-7-12 grid__item--desktop-13-24">
              <div className="artwork-details-page__info">
                <h1 className="artwork-details-page__title">
                  {artwork?.title}
                </h1>

                <ul className="artwork-details-page__list">
                  <li className="artwork-details-item">
                    <p className="artwork-details-page__text">
                      Artist: <strong>{artwork?.artist}</strong>
                    </p>
                  </li>

                  <li className="artwork-details-item">
                    <p className="artwork-details-page__text">
                      Price: <strong>${artwork?.price}</strong>
                    </p>
                  </li>

                  <li className="artwork-details-item">
                    <p className="artwork-details-page__text">
                      Type: {artwork?.type}
                    </p>
                  </li>

                  <li className="artwork-details-item">
                    <p className="artwork-details-page__text">
                      {artwork?.availability ? 'Available' : 'Not available'}
                    </p>
                  </li>
                </ul>

                {isAdmin && (
                  <div className="artwork-details-page__buttons">
                    <button
                      className="artwork-details-page__button button button--primary"
                      onClick={handleEdit}
                    >
                      Edit Artwork
                    </button>

                    <button
                      className="artwork-details-page__button button button--primary"
                      onClick={handleRemove}
                    >
                      Remove Artwork
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
