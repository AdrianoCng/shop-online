import { Request, Response } from 'express';

import { User } from '../models';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send('not found');
    }

    return res.send(users);
  } catch (error) {
    return res.status(500).send('error');
  }
};

export default {
  getUsers,
};
