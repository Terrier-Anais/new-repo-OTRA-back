import { Router } from "express";
import { router as userRouter } from "./userRouter.js";
import { router as tripRouter } from "./tripRouter.js";
import { router as pictureRouter } from "./pictureRouter.js";

export const router = Router();

router.use(userRouter);
router.use(pictureRouter);
router.use(tripRouter);
