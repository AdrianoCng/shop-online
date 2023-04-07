import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import router from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1', router);

export default app;
