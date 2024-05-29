import {Router} from 'express';
import uploadController from '../controllers/uploadController.js';
// import upload from '../middlewares/multer.config.js';
import { controllerWrapper as cw} from './controllerWrapper.js';

export const router = Router();
//router.post('/upload', cw,upload,uploadController.uploadPicture);
router.post('/upload', cw(uploadController.uploadPicture));