import {Router} from "express";
import authController from "../controllers/authController.js";

export const router = Router();

router.get("/signup", authController.renderSignup);
