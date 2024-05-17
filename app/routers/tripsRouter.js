import { Router } from "express";
import * as tripsController from "../controllers/tripsController.js";
import { controllerWrapper as cw } from "./controllerWrapper.js";

export const router = Router();

router.get("/", cw(tripsController.getAllTrips));


