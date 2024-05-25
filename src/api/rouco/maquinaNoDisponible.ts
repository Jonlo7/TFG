import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get(
    "/maquina-no-disponible",
    async (req: Request, res: Response, next: NextFunction) => {
        
        res.render("maquinaNoDisponible", { layout: "index", });
    },
);

export default router;