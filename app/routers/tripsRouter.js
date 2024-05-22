import { Router } from "express";
import * as tripsController from "../controllers/tripsController.js";
import { controllerWrapper as cw} from "./controllerWrapper.js";
import { jwtService } from "../middlewares/jwt.service.js";
export const router = Router();

router.use(jwtService);

router.get('/me/trips', tripsController.getMyTrips);
router.get("/me/trips/:id", tripsController.getVisitsForTrip);
router.post("/me/trips",cw(tripsController.createTrip));
router.patch("/me/trips/:id", cw(tripsController.updateTrip));
router.delete("/me/trips/:id", cw(tripsController.deleteTrip))

