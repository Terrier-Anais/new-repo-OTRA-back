import { Router } from "express";
import * as visitsController from "../controllers/visitsController.js";

export const router = Router();

router.get('/me/visits', visitsController.getMyVisits);



