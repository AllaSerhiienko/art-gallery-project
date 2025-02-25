import './Header.scss';
import { Logo } from '../Logo';
import { useState } from 'react';

export const Header = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem('role') === 'admin',
  );

  const handleLoginAsAdmin = () => {
    localStorage.setItem('role', 'admin');
    setIsAdmin(true);
    window.location.reload();
  };

  const handleLogoutAsAdmin = () => {
    localStorage.removeItem('role');
    setIsAdmin(false);
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Logo />

          {!isAdmin ? (
            <button
              className="header__button button"
              onClick={handleLoginAsAdmin}
            >
              Login as admin
            </button>
          ) : (
            <button
              className="header__button button"
              onClick={handleLogoutAsAdmin}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
