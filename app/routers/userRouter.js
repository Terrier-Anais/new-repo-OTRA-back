import {Router} from 'express';
import userController from '../controllers/userController.js'
import { controllerWrapper as cw} from './controllerWrapper.js';

export const router = Router();

// Inscription et connexion d'un utilisateur
router.post("/signup", cw(userController.handleSignupFormSubmit));
router.post("/login", cw(userController.handleLoginFormSubmit));
// Gestion du profil de l'utilisateur
router.get("/profil/:id", cw(userController.getUser));
router.patch("/profil/:id", cw(userController.updateUser));
router.delete("/profil/:id", cw(userController.deleteUser));




