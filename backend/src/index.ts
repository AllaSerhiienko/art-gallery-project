/* eslint-disable no-console */
import { createServer } from './createServer.js';

const port = process.env.PORT || 8000;

createServer().listen(port, () => {
  console.log(`Server running on port ${port}`);
});
