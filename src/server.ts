import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { User } from './models';

const app = express();

app.use(cors());
app.use(helmet());

app.get('/', async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send('not found');
    }

    return res.send(users);
  } catch (error) {
    return res.status(500).send('error');
  }
});

export default app;
