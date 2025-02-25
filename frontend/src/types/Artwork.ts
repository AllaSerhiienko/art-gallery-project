import { ArtworkType } from './ArtworkType';

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  type: ArtworkType;
  price: number;
  availability?: boolean;
};
