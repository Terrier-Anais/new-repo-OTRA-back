import { Router } from "express";

import { router as userRouter } from "./userRouter.js";
import { router as tripRouter } from "./tripsRouter.js";
import { router as uploadRouter } from "./uploadRouter.js";


export const router = Router();

router.use(userRouter);
router.use(uploadRouter);
router.use(tripRouter);



// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found"});
});