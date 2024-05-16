import express from 'express';
import tripsRouter from './trips.api.router.js';
import ApiError from '../../errors/api.error.js';

const router = express.Router();

router.use((_, res, next) => {
  res.format = 'json';
  next();
});

/**
 * @route GET /api/trips/…
 */
router.use('/trips', tripsRouter);
/**
 * @route GET /api/trips/…
 */
router.use('/trips', tripsRouter);

router.use((_, __, next) => {
  next(ApiError(404, 'Not Found'));
});

export default router;
