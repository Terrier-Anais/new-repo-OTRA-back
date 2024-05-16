import express from 'express';
import tripsDatamapper from '../../datamappers/trips.datamapper';
import  {controllerWrapper as cw} from '../../middlewares/controllerWrapper';
import { validateId, validateTrip } from '../../middlewares/validation.midlleware';

const router = express.Router();


router.get('/trips', cw(tripsDatamapper));
router.get('/trips/:id', validateId, cw(tripsDatamapper));
router.post('/trips',validateTrip, cw(tripsDatamapper));
router.patch('/trips/:id', validateTrip, validateId, cw(tripsDatamapper));
router.delete('/trips/:id', validateId, cw(tripsDatamapper));

export default router;
