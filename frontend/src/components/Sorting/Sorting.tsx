import { useEffect, useRef, useState } from 'react';
import './Sorting.scss';
import { useSearchParams } from 'react-router-dom';

export const Sorting = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const dropdownList = dropdownListRef.current;

    if (dropdownList) {
      if (isDropdownOpen) {
        dropdownList.classList.add('sorting__list--visible');
      } else {
        dropdownList.classList.remove('sorting__list--visible');
      }
    }
  }, [isDropdownOpen]);

  const toggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget &&
      event.relatedTarget?.className.includes('sorting__field')
    ) {
      return;
    }

    setIsDropdownOpen(false);
  };

  const handleSelect = (order: 'asc' | 'desc') => {
    searchParams.set('price', order);
    setSearchParams(searchParams);

    setIsDropdownOpen(false);
  };

  const handleResetSorting = () => {
    searchParams.delete('price');
    setSearchParams(searchParams);
    setIsDropdownOpen(false);
  };

  return (
    <div className="sorting">
      <button
        className="sorting__button"
        type="button"
        onClick={toggle}
        onBlur={handleBlur}
      >
        <p className="sorting__sort-by">Sort by</p>

        {isDropdownOpen ? (
          <i className="icon icon--arrow-disabled-up" />
        ) : (
          <i className="icon icon--arrow-disabled-down" />
        )}
      </button>

      <ul className="sorting__list" ref={dropdownListRef}>
        <li>
          <button
            type="button"
            className="sorting__field"
            onClick={() => {
              handleSelect('asc');
            }}
          >
            Prise (Ascending)
          </button>
        </li>

        <li>
          <button
            type="button"
            className="sorting__field"
            onClick={() => {
              handleSelect('desc');
            }}
          >
            Prise (Descending)
          </button>
        </li>

        <li>
          <button
            type="button"
            className="sorting__field"
            onClick={() => handleResetSorting()}
          >
            Default
          </button>
        </li>
      </ul>
    </div>
  );
};
