import { Router, Request, Response, NextFunction } from 'express';
import { TiempoReal } from '../../schemas';

const router = Router();


router.get(
    "/maquina-llenadora",
    async (_req: Request, res: Response, next: NextFunction) => {
        res.render("maquinaLlenadora", { layout: "index", });
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