import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .trim(),
  body('password').notEmpty().withMessage('Please enter your password').isString(),
];
