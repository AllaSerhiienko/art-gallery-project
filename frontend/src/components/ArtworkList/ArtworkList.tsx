import './ArtworkList.scss';

import { ArtworkCard } from '../ArtworkCard/ArtworkCard';
import { Artwork } from '../../types';

type Props = {
  artworks: Artwork[];
};

export const ArtworkList: React.FC<Props> = ({ artworks }) => {
  return (
    <div className="artwork-list">
      <ul className="grid artwork-list__list">
        {artworks.map(artwork => {
          return (
            <li className="artwork-list__card grid__item" key={artwork.id}>
              <ArtworkCard artwork={artwork} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
