import { Router } from "express";
import * as tripsController from "../controllers/tripsController.js";
import { controllerWrapper as cw} from "./controllerWrapper.js";

export const router = Router();

router.get("/me/trips",cw(tripsController.getMyTrips));
router.get("/me/trips/:id", cw(tripsController.getOneTrip));
router.post("/me/trips",cw(tripsController.createTrip));
router.patch("/me/trips/:id", cw(tripsController.updateTrip));
router.delete("/me/trips/:id", cw(tripsController.deleteTrip))

