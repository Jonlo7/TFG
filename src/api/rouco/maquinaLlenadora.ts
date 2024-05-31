import { Router, Request, Response, NextFunction } from 'express';
import { TiempoReal,Botones} from '../../schemas';

const router = Router();


router.get(
    "/maquina-llenadora",
    async (_req: Request, res: Response, next: NextFunction) => {
        const trabajador = _req.session.trabajador;
        let isAdmin: boolean = trabajador?.id_Cargo === '5262b2a3-328e-4843-bede-cd02a21e5d49';
        let isTecnico: boolean = trabajador?.id_Cargo === '4517e5b7-e8a9-43b3-879b-c1a2de8d7278';
        res.render("maquinaLlenadora", { layout: "index", isAdmin: isAdmin, isTecnico: isTecnico});
    },
);

router.get(
    "/tiempo-real",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const todasTiempoReal = await TiempoReal.findAll();
            res.json({
                todasTiempoReal
            });
        } catch (error) {
            next(error);
        }
    },
);

export default router;