import { body, param } from 'express-validator';

export default [
  param('id').isMongoId(),
  body('name').optional().trim().isLength({ max: 50 }),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('price').optional().isFloat({ gt: 0 }),
  body('availability').optional().trim().isIn(['in stock', 'unavailable']),
  body('quantity').optional().isInt({ min: 0 }),
  body('brand').optional().trim(),
  body('category').optional().isString().trim(),
  body('image').optional().isURL(),
  body('reviews').optional().isIn([]).withMessage('use /products/:id/reviews to add a review'),
  body('discountPercentage').optional().isInt({ min: 0, max: 100 }),
  body('shippingCost').optional().isFloat({ gt: 0 }),
  body('tags').isEmpty(),
];
