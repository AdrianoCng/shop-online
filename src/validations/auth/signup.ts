import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email')
    .trim()
    .toLowerCase()
    .bail(),
  body('password')
    .notEmpty()
    .withMessage('Please enter your passowrd')
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be atleast 8 chars and include 1 number, 1 lowercase, 1 uppercase, 1 Symbol'
    ),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your password')
    .custom((value, { req }) => {
      const isMatch = value === req.body.password;

      if (!isMatch) {
        return Promise.reject();
      }

      return Promise.resolve();
    })
    .withMessage('Password do not match'),
];
