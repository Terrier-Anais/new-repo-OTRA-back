import {Router} from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.get("/signup", authController.renderSignup);
// router.post("/signup", authController.handleSignupFormSubmit);
// router.get("/login", authController.renderLogin);
// router.post("/login", authController.handleLoginFormSubmit);
// router.get("/logout", authController.logout);

module.exports = router;