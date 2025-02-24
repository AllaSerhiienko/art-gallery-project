import express from 'express';
import cors from 'cors';
import { router as artworkRouter } from './routes/artwork.router.js';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/artworks', artworkRouter);

  return app;
}
