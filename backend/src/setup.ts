/* eslint-disable no-console */
import { Artwork } from './models/Artwork.model.js';
import { sequelize } from './utils/db.js';
import { defaultArtworks } from './data/defaultArtworks.js';

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await Artwork.sync({ force: true });
    console.log('Table "artworks" has been created!');

    await Artwork.bulkCreate(defaultArtworks);
    console.log('Default artworks added');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

setupDatabase();
