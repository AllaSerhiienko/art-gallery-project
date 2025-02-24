import express from 'express';
import * as artworkController from '../controllers/artwork.controller.js';

const router = express.Router();

router.get('/', artworkController.get);

router.get('/:id', artworkController.getOne);

router.delete('/:id', artworkController.remove);

router.post('/', artworkController.create);

router.put('/:id', artworkController.update);

export { router };
