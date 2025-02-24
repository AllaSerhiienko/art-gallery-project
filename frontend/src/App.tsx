import './App.scss';
import { ArtworkList } from './components/ArtworkList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Sorting } from './components/Sorting/Sorting';

export const App: React.FC = () => (
  <div className="app">
    <Header />

    <main className="main">
      <div className="container">
        <div className="main__content">
          <h1 className="main__title">Explore our collection</h1>

          <div className="main__actions grid grid--tablet">
            <div className="grid__item grid__item--tablet-1-6 grid__item--desktop-1-8">
              <SearchBar />
            </div>

            <div className="grid__item grid__item--tablet-10-12 grid__item--desktop-21-24">
              <Sorting />
            </div>
          </div>

          <ArtworkList />

          <div className="main__buttons">
            <button className="main__button button button--primary">
              Add new artwork
            </button>

            <button className="main__button button button--primary">
              Remove artwork
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);
