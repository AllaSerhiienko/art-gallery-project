import express from 'express';
import * as artworkController from '../controllers/artwork.controller.js';

const router = express.Router();

router.get('/', artworkController.get);

router.get('/artists', artworkController.getArtists);

router.post('/', artworkController.create);

router.get('/:id', artworkController.getOne);

router.delete('/:id', artworkController.remove);

router.put('/:id', artworkController.update);

export { router };
