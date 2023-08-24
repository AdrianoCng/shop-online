import { body, param } from 'express-validator';

export default [param('id').isMongoId(), body('shippingAddress').isString().trim().escape()];
