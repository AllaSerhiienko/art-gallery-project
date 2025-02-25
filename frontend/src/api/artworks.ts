import { Artwork } from '../types';
import { client } from '../helpers/fetchClient';

export const getArtworks = (params: URLSearchParams) => {
  const url = `artworks?${params.toString()}`;
  return client.get<Artwork[]>(url);
};

export const getArtworkDetails = (id: string) => {
  return client.get<Artwork>(`artworks/${id}`);
};

export const addArtwork = (data: Omit<Artwork, 'id'>) => {
  return client.post<Artwork>('artworks', data);
};

export const updateArtwork = (id: string, data: Omit<Artwork, 'id'>) => {
  return client.put<Artwork>(`artworks/${id}`, data);
};

export const deleteArtwork = (id: string) => {
  return client.delete(`artworks/${id}`);
};

export const getArtists = (): Promise<string[]> => {
  return client.get('artworks/artists');
};
