export type Artwork = {
  id: string;
  title: string;
  artist: string;
  type: 'painting' | 'sculpture' | 'other';
  price: number;
  availability: boolean;
  imageUrl?: string;
};
