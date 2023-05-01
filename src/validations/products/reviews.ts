import { body, param } from 'express-validator';

export default [
  param('id').isMongoId(),
  body('reviewer').not().isEmpty().isString().trim().isLength({ max: 50 }),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().isString().isLength({ max: 1000 }).toLowerCase(),
];
