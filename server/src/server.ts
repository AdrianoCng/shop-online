import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { errorHandler } from '@middlewares/index';

import router from '@routes/index';

const app = express();

app.use(express.static(path.resolve('../client/dist')));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', router);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use(errorHandler);

export default app;
