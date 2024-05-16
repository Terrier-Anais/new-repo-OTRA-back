import express from 'express';

import ApiError from '../../errors/api.error.js';

const router = express.Router();

router.use((_, res, next) => {
  res.format = 'json';
  next();
});

/**
 * @route GET /api/categories/…
 */
router.use('/categories', categoriesRouter);
/**
 * @route GET /api/posts/…
 */
router.use('/posts', postsRouter);

router.use((_, __, next) => {
  next(ApiError(404, 'Not Found'));
});

export default router;
