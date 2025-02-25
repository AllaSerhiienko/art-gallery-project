import express from 'express';
import cors from 'cors';
import { router as artworkRouter } from './routes/artwork.router.js';
import { errorHandler } from './utils/errorHandler.js';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/artworks', artworkRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
  
  app.use(errorHandler);

  return app;
}
