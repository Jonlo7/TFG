import { Router, Request, Response, NextFunction } from 'express';
import { TiempoReal } from '../../schemas';

const router = Router();

router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        const trabajador = req.session.trabajador;
        let isAdmin: boolean = trabajador?.id_Cargo === '5262b2a3-328e-4843-bede-cd02a21e5d49';
        res.render("planta", { layout: "index", isAdmin: isAdmin});
    },
);

router.get(
    "/estado-llenadora",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const llenadora = await TiempoReal.findOne({ where: { clave: 'mMarcha' } });
            if (llenadora) {
                res.json({
                    valor: llenadora.valorParseado
                });
            } else {
                res.status(404).json({ message: 'No se encontró la clave mMarcha' });
            }
        } catch (error) {
            next(error);
        }
    },
);

export default router;