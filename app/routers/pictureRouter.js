import {Router} from 'express';
import pictureController from '../controllers/pictureController.js';
import { controllerWrapper as cw} from './controllerWrapper.js';

export const router = Router();

router.post('/upload', cw(pictureController.uploadPicture));
router.post('/uploadVisit', cw(pictureController.uploadPictureVisit));