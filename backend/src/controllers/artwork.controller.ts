import { ArtworkType } from '../types/ArtworkType.js';
import { SortPriceType } from '../types/SortPriceType.js';
import * as artworkService from './../services/artwork.service.js';
import { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    res.send(await artworkService.getAll());

    return;
  }

  const { price, artist, type } = req.query;

  let normalizedArtist = artist;

  if (typeof artist === 'string') {
    normalizedArtist = artist.replaceAll('_', ' ');
  }

  const artworks = await artworkService.getFiltered({
    price: price as SortPriceType,
    artist: normalizedArtist as string,
    type: type as ArtworkType,
  });

  res.send(artworks);
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const artwork = await artworkService.getById(id);

  if (!artwork) {
    res.sendStatus(404);
    return;
  }

  res.send(artwork);
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!(await artworkService.getById(id))) {
    res.sendStatus(404);
    return;
  }

  await artworkService.remove(id);
  res.sendStatus(204);
};

export const create = async (req: Request, res: Response) => {
  const { title, artist, type, price, availability } = req.body;

  if (!title || !artist || !type || price === undefined) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  if (title.length > 99) {
    res
      .status(400)
      .send({ message: 'Title must be 99 characters or less' });
    return;
  }

  if (artist.length > 50) {
    res
      .status(400)
      .send({ message: 'Artist name must be 50 characters or less' });
    return;
  }

  if (!Object.values(ArtworkType).includes(type)) {
    res.status(400).send({ message: 'Invalid artwork type' });
    return;
  }

  if (typeof price !== 'number' || price <= 0) {
    res
      .status(400)
      .send({ message: 'Price must be a number greater than 0' });
    return;
  }

  const artwork = await artworkService.create({
    title,
    artist,
    type,
    price,
    availability,
  });

  res.status(201).send(artwork);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, artist, type, price, availability } = req.body;

  const artwork = await artworkService.getById(id);

  if (!artwork) {
    res.sendStatus(404);
    return;
  }

  if (!title || !artist || !type || price === undefined) {
    res.status(422).send({ message: 'Missing required fields' });
    return;
  }

  if (title.length > 99) {
    res
      .status(422)
      .send({ message: 'Title must be 99 characters or less' });
    return;
  }

  if (artist.length > 50) {
    res
      .status(422)
      .send({ message: 'Artist name must be 50 characters or less' });
    return;
  }

  if (!Object.values(ArtworkType).includes(type)) {
    res.status(422).send({ message: 'Invalid artwork type' });
    return;
  }

  if (typeof price !== 'number' || price <= 0) {
    res
      .status(422)
      .send({ message: 'Price must be a number greater than 0' });
    return;
  }

  await artworkService.update({ id, title, artist, type, price, availability });

  const updatedArtwork = await artworkService.getById(id);

  res.send(updatedArtwork);
};
