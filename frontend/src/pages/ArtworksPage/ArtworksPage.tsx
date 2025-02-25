import './ArtworksPage.scss';
import { ArtworkList } from '../../components/ArtworkList';
import { useEffect, useState } from 'react';
import { Artwork, ArtworkType } from '../../types';
import { addArtwork, getArtists, getArtworks } from '../../api/artworks';
import { Loader } from '../../components/Loader';
import { SomethingWentWrong } from '../../components/SomethingWentWrong';
import { useSearchParams } from 'react-router-dom';
import { ArtworkForm } from '../../components/ArtworkForm';
import { Dropdown } from '../../components/Dropdown';

export const ArtworksPage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artists, setArtists] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchArtworks = (params: URLSearchParams) => {
    setIsLoading(true);

    getArtworks(params)
      .then(data => {
        setArtworks(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    fetchArtworks(params);
  }, [searchParams]);

  useEffect(() => {
    getArtists().then((data: string[]) => {
      const artistsOptions: { [key: string]: string } = {
        'All artists': 'default',
      };

      data.forEach(artist => {
        artistsOptions[artist] = artist;
      });

      setArtists(artistsOptions);
    });
  }, []);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const typeOptions = {
    Painting: ArtworkType.Painting,
    Sculpture: ArtworkType.Sculpture,
    Photography: ArtworkType.Photography,
    Ceramics: ArtworkType.Ceramics,
    Other: ArtworkType.Other,
    'All types': 'default',
  };

  const handleFormOpen = () => setIsFormVisible(true);

  const handleFormClose = () => setIsFormVisible(false);

  const handleSubmit = (newArtwork: Omit<Artwork, 'id'>) => {
    setIsLoading(true);

    addArtwork(newArtwork)
      .then(() => {
        const params = new URLSearchParams(searchParams);
        fetchArtworks(params);
        setIsFormVisible(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  if (isError && !isLoading) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="artworks-page">
      <h1 className="artworks-page__title">Explore our collection</h1>

      <div className="artworks-page__actions grid grid--tablet">
        <div className="grid__item grid__item--tablet-1-3 grid__item--desktop-1-5">
          <Dropdown
            title="Sort by"
            options={{
              'Price (Ascending)': 'asc',
              'Price (Descending)': 'desc',
              Default: 'default',
            }}
            searchParam="price"
            defaultValue="default"
          />
        </div>

        <div className="grid__item grid__item--tablet-4-6 grid__item--desktop-6-10">
          <Dropdown
            title="Filter by Type"
            options={typeOptions}
            searchParam="type"
            defaultValue="default"
          />
        </div>

        <div className="grid__item grid__item--tablet-7-9 grid__item--desktop-11-15">
          <Dropdown
            title="Filter by Artist"
            options={artists}
            searchParam="artist"
            defaultValue="default"
          />
        </div>

        <div className="artworks-page__reset grid__item grid__item--tablet-10-12 grid__item--desktop-16-20">
          <button
            className="button button--secondary"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>

        <div className="grid__item grid__item--tablet-10-12 grid__item--desktop-21-24"></div>
      </div>

      {isLoading ? <Loader /> : <ArtworkList artworks={artworks} />}

      {isAdmin && !isFormVisible && (
        <button
          className="artworks-page__button button button--primary"
          onClick={handleFormOpen}
        >
          Add new artwork
        </button>
      )}

      {isAdmin && isFormVisible && (
        <ArtworkForm onSubmit={handleSubmit} onCancel={handleFormClose} />
      )}
    </div>
  );
};
