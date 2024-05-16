import express from 'express';
import controller from '../../controllers/website/index.website.controller.js';
import ApiError from '../../errors/api.error.js';

const router = express.Router();

router.use((_, res, next) => {
  res.format = 'html';
  next();
});

/**
 * @route GET /
 */
router.get('/', controller.homePage);

router.use((_, __, next) => {
  next(ApiError(404, 'Not Found'));
});

export default router;