import { body } from 'express-validator';

export default [
  body('name').notEmpty().isString().trim().isLength({ max: 50 }).toLowerCase(),
  body('description').notEmpty().isString().trim().isLength({ max: 1000 }).toLowerCase(),
  body('price').isFloat({ gt: 0 }),
  body('availability').notEmpty().isString().trim().isIn(['in stock', 'unavailable']).toLowerCase(),
  body('quantity').notEmpty().isInt({ min: 0 }),
  body('brand').notEmpty().isString().trim().toLowerCase(),
  body('category').isString().trim().toLowerCase(),
  body('image').optional().isURL().toLowerCase(),
  body('reviews').optional().isArray(),
  body('discountPercentage').optional().isInt({ min: 0, max: 100 }),
  body('shippingCost').optional().isFloat({ gt: 0 }),
  body('tags').optional().isArray(),
];
