import './Footer.scss';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Logo color="light" />

          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com/AllaSerhiienko/"
                className="footer__link"
              >
                <div className="icon icon--github"></div>
              </a>
            </li>

            <li className="footer__item">
              <a
                href="mailto:allasergienko706@gmail.com"
                className="footer__link"
              >
                <div className="icon icon--mail"></div>
              </a>
            </li>

            <li className="footer__item">
              <a href="tel:+123456789" className="footer__link">
                <div className="icon icon--phone"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
