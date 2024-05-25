import { Router } from 'express';

import authenticationRouter from './authentication.rouco';
import plantaRouter from './planta';
import maquinaLlenadoraRouter from './maquinaLlenadora';
import historicos from './historicos';
import maquinaNoDisponible from './maquinaNoDisponible';
import plcRouter from './plc.rouco';

import { requireAuth, requirePLCAuth } from '../middlewares/auth';

const router = Router();

router.use('/plc', /*requirePLCAuth,*/ plcRouter);

router.use(authenticationRouter);


// all routes below this line require authentication
router.use(requireAuth);
router.use(maquinaLlenadoraRouter);
router.use(plantaRouter)
router.use(historicos);
router.use(maquinaNoDisponible);
// router.use(backupsRouter);

export default router;