import {Router} from "express";
import authController from "../controllers/authController.js";
// import { controllerWrapper as cw} from "./controllerWrapper.js";

export const router = Router();

router.post("/signup", authController.handleSignupFormSubmit);

router.post("/login", authController.handleLoginFormSubmit);

// router.get("/logout", authController.logout);



