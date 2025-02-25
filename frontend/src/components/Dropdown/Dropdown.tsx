import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  options: { [key: string]: string };
  searchParam: 'price' | 'artist' | 'type';
  defaultValue: string | null;
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  searchParam,
  defaultValue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get(searchParam) || defaultValue;

  const dropdownListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const dropdownList = dropdownListRef.current;

    if (dropdownList) {
      if (isDropdownOpen) {
        dropdownList.classList.add('dropdown__list--visible');
      } else {
        dropdownList.classList.remove('dropdown__list--visible');
      }
    }
  }, [isDropdownOpen]);

  const toggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget &&
      event.relatedTarget?.className.includes('dropdown__value')
    ) {
      return;
    }

    setIsDropdownOpen(false);
  };

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'default') {
      params.delete(searchParam);
    } else {
      params.set(searchParam, value);
    }

    setSearchParams(params);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__content">
        <p className="dropdown__title">{title}</p>

        <button
          className="dropdown__trigger"
          type="button"
          onClick={toggle}
          onBlur={handleBlur}
        >
          <p className="dropdown__selected">
            {Object.keys(options).find(
              key => options[key] === selectedOption,
            ) || 'Choose option'}
          </p>

          {isDropdownOpen ? (
            <i className="icon icon--arrow-disabled-up" />
          ) : (
            <i className="icon icon--arrow-disabled-down" />
          )}
        </button>

        <ul className="dropdown__list" ref={dropdownListRef}>
          {Object.entries(options).map(([key, value]) => (
            <li key={value}>
              <button
                type="button"
                className="dropdown__value"
                onClick={() => {
                  handleSelect(value);
                }}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
