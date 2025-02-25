import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { ArtworksPage } from './pages/ArtworksPage';
import { ArtworkDetailsPage } from './pages/ArtworkDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Navigate to="/artworks/" />} />

        <Route path="/artworks/">
          <Route index element={<ArtworksPage />} />

          <Route path=":artworkId" element={<ArtworkDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
