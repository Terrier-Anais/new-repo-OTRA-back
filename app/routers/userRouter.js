import {Router} from "express";
import authController from "../controllers/authController.js";

export const router = Router();

// router.get("/signup", authController.renderSignup);
// Route pour afficher le html de la page d'inscription

router.post("/signup", authController.handleSignupFormSubmit);
// Envoie des données de l'user vers la db

// router.get("/login", authController.renderLogin);
// Connexion du client -- affichage de la page

router.post("/login", authController.handleLoginFormSubmit);
// envoie des donnée de connexion


// router.get("/logout", authController.logout);
// déconnexion

router.get("/cookie", authController.tryCookie);
