import { Router } from 'express';

import authenticationRouter from './authentication.rouco';
import planta from './planta';
import maquinaLlenadoraRouter from './maquinaLlenadora';
import plcRouter from './plc.rouco';

import { requireAuth, requirePLCAuth } from '../middlewares/auth';

const router = Router();

router.use('/plc', /*requirePLCAuth,*/ plcRouter);

router.use(authenticationRouter);


// all routes below this line require authentication
router.use(requireAuth);
router.use(maquinaLlenadoraRouter);
router.use(planta)
// router.use(backupsRouter);

export default router;