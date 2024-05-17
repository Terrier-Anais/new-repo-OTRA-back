import { Router } from "express";
import * as tripsController from "../controllers/tripsController.js";


export const router = Router();

router.get("/trips",tripsController.getMyTrips);


