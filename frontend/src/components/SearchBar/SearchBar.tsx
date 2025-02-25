import { useEffect, useState } from 'react';
import './SearchBar.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  handleSearch: (query: string) => void;
};

export const SearchBar: React.FC<Props> = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
    handleSearch(query);

    if (query) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  };

  const handleClearQuery = () => {
    setSearchQuery('');
    setSearchParams({});
    handleSearch('');
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams({ query: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  return (
    <div className="search-bar">
      <div className="search-bar__content">
        <input
          type="text"
          className="search-bar__input"
          value={searchQuery}
          onChange={handleQueryChange}
          placeholder="Search..."
        />

        {searchQuery && (
          <button className="search-bar__button" onClick={handleClearQuery}>
            <div className="icon icon--cross" />
          </button>
        )}
      </div>
    </div>
  );
};
