/* eslint-disable */
import * as dotenv from 'dotenv';
dotenv.config();
import 'tsconfig-paths/register';

import app from './server';

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  process.exit(1);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
