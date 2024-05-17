import express from 'express';
import errorMiddleware from '../middlewares/error.middleware.js';

const router = express.Router();

// /**
//  * @route GET /api/…
//  */
// router.use('/api', apiRouter);
// /**
//  * @route GET /…
//  */
// router.use('/', websiteRouter);

router.use(errorMiddleware);

export default router;
