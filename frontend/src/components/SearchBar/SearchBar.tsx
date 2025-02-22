import { useState } from 'react';
import './SearchBar.scss';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
          <button className="search-bar__button">
            <div className="icon icon--cross" />
          </button>
        )}
      </div>
    </div>
  );
};
