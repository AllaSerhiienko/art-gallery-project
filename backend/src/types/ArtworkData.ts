import { ArtworkType } from './ArtworkType.js';

export type ArtworkData = {
  id: string;
  title: string;
  artist: string;
  type: ArtworkType;
  price: number;
  availability?: boolean;
};
