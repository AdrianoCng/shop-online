import { body } from 'express-validator';

export default [
  body('name').notEmpty().isString().trim().isLength({ max: 50 }),
  body('description').notEmpty().isString().trim().isLength({ max: 1000 }),
  body('price').isFloat({ gt: 0 }),
  body('availability').notEmpty().isString().trim().isIn(['in stock', 'unavailable']),
  body('quantity').notEmpty().isInt({ min: 0 }),
  body('brand').notEmpty().isString().trim(),
  body('category').isString().trim(),
  body('image').optional().isURL(),
  body('reviews').optional().isArray(),
  body('discountPercentage').optional().isInt({ min: 0, max: 100 }),
  body('shippingCost').optional().isFloat({ gt: 0 }),
  body('tags').isArray(),
];
