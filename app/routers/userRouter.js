import {Router} from 'express';
import userController from '../controllers/userController.js'
import { controllerWrapper as cw} from './controllerWrapper.js';

export const router = Router();

// User registration and login
router.post("/signup", cw(userController.signUp));
router.post("/login", cw(userController.logIn));
// profile management
router.get("/profil/:id", cw(userController.getUser));
router.patch("/profil/:id", cw(userController.updateUser));
router.delete("/profil/:id", cw(userController.deleteUser));




