import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .trim()
    .toLowerCase(),
  body('password').notEmpty().withMessage('Please enter your password').isString(),
];
