import { title } from 'process';
import { Artwork } from '../models/Artwork.model.js';
import { ArtworkData } from '../types/ArtworkData.js';
import { ArtworkType } from '../types/ArtworkType.js';
import { SortPriceType } from '../types/SortPriceType.js';

type ArtworkFilters = {
  price?: SortPriceType;
  artist?: string;
  type?: ArtworkType;
};

export const getAll = () => {
  return Artwork.findAll();
};

export const getFiltered = async ({ price, artist, type }: ArtworkFilters) => {
  const where: { [key: string]: any } = {};
  if (artist) {
    where.artist = artist;
  }

  if (type) {
    where.type = type;
  }

  const result = await Artwork.findAll({
    where,
    order: price ? [['price', price]] : undefined,
  });

  return result;
};

export const getById = (id: string) => {
  return Artwork.findByPk(id);
};

export const remove = async (id: string) => {
  await Artwork.destroy({
    where: {
      id,
    },
  });
};

export const create = (newArtwork: Omit<ArtworkData, 'id'>) => {
  return Artwork.create(newArtwork);
};

export const update = async ({ id, title, artist, type, price, availability }: ArtworkData) => {
  await Artwork.update(
    { title, artist, type, price, availability },
    { where: { id } },
  );
};
