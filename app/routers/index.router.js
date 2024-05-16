import express from 'express';
import errorMiddleware from '../middlewares/error.middleware.js';
import apiRouter from './api/index.api.router.js';
import websiteRouter from './website/index.website.router.js';

const router = express.Router();

/**
 * @route GET /api/…
 */
router.use('/api', apiRouter);
/**
 * @route GET /…
 */
router.use('/', websiteRouter);

router.use(errorMiddleware);

export default router;
