import './Header.scss';
import { Logo } from '../Logo';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Logo />

          <button className="header__button button">Login as Admin</button>
        </div>
      </div>
    </header>
  );
};
