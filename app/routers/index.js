import { Router } from "express";

import { router as userRouter } from "./userRouter.js";
import { router as tripRouter } from "./tripsRouter.js";

// import { router as tagRouter } from "./tagRouter.js";

export const router = Router();

router.use(userRouter);
router.use(tripRouter);

// router.use(tagRouter);

// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found"});
});