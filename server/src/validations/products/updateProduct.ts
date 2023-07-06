import { body, param } from 'express-validator';

export default [
  param('id').isMongoId(),
  body('name').optional().trim().isLength({ max: 50 }).toLowerCase(),
  body('description').optional().trim().isLength({ max: 1000 }).toLowerCase(),
  body('price').optional().isFloat({ gt: 0 }),
  body('availability').optional().trim().isIn(['in stock', 'unavailable']).toLowerCase(),
  body('quantity').optional().isInt({ min: 0 }),
  body('brand').optional().trim().toLowerCase(),
  body('category').optional().isString().trim().toLowerCase(),
  body('image').optional().isURL().toLowerCase(),
  body('reviews').optional().isIn([]).withMessage('use /products/:id/reviews to add a review'),
  body('discountPercentage').optional().isInt({ min: 0, max: 100 }),
  body('shippingCost').optional().isFloat({ gt: 0 }),
  body('tags').isEmpty(),
];
