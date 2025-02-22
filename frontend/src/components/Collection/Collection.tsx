import './Collection.scss';
import img1 from '@/images/photos/1.jpg';
import img2 from '@/images/photos/2.jpg';
import img3 from '@/images/photos/3.jpg';
import img4 from '@/images/photos/4.jpg';
import img5 from '@/images/photos/5.jpg';

const artworks = [
  {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    price: 10000,
    imageUrl: img1,
  },
  {
    id: '2',
    title: 'The Thinker',
    artist: 'Auguste Rodin',
    price: 8000,
    imageUrl: img2,
  },
  {
    id: '3',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    price: 12000,
    imageUrl: img3,
  },
  {
    id: '4',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    price: 15000,
    imageUrl: img4,
  },
  {
    id: '5',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    price: 20000,
    imageUrl: img5, // Велике зображення
  },
];

export const Collection = () => {
  return (
    <div className="collection">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="collection__card artwork-card">
          <img src={artwork.imageUrl} alt={artwork.title} className="artwork-card__image" />
          <div className="artwork-card__info">
            <h3 className="artwork-card__title">{artwork.title}</h3>
            <p className="artwork-card__artist">{artwork.artist}</p>
            <p className="artwork-card__price">${artwork.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
