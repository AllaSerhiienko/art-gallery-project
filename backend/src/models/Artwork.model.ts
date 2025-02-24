import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { v4 as uuidv4 } from 'uuid';
import { ArtworkType } from '../types/ArtworkType.js';

export const Artwork = sequelize.define(
  'Artwork',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 99] },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 50] },
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ArtworkType)),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'artworks',
    updatedAt: false,
    createdAt: false,
  },
);
