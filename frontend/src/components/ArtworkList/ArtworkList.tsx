import './ArtworkList.scss';
import img1 from '@/images/photos/1.jpg';
import img2 from '@/images/photos/2.jpg';
import img3 from '@/images/photos/3.jpg';
import img4 from '@/images/photos/4.jpg';
import img5 from '@/images/photos/5.jpg';
import { ArtworkCard } from '../ArtworkCard/ArtworkCard';

const artworks = [
  {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    type: 'painting',
    price: 10000,
    imageUrl: img1,
    availability: true,
  },
  {
    id: '2',
    title: 'The Thinker',
    artist: 'Auguste Rodin',
    price: 8000,
    imageUrl: img2,
    type: 'sculpture',
    availability: false,
  },
  {
    id: '3',
    title: 'Mona Lisrdo da Vinci The Memoa',
    artist: 'Leonardo da iug',
    price: 12000,
    imageUrl: img3,
    type: 'painting',
    availability: true,
  },
  {
    id: '4',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    price: 15000,
    imageUrl: img4,
    type: 'sculpture',
    availability: false,
  },
  {
    id: '5',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    price: 20000,
    imageUrl: img5,
    type: 'other',
    availability: true,
  },
];
// type Props = {
//   artworks: Product[];
// };

export const ArtworkList = () => {
  return (
    <div className="artwork-list">
      <ul className="grid artwork-list__list">
        {artworks.map((artwork) => {
          return (
            <li
              className="artwork-list__card grid__item"
              key={artwork.id}
            >
              <ArtworkCard artwork={artwork} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
