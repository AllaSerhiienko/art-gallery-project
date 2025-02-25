import './NotFoundPage.scss';
import imgUrl from '../../images/page-not-found.png';

export const NotFoundPage = () => (
  <section className="not-found-page">
    <h1 className="not-found-page__title">Page not found</h1>

    <img
      src={imgUrl}
      alt="page was not found"
      className="not-found-page__image"
    />
  </section>
);
