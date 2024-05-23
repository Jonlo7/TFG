import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        //renderizar la vista solo para trabajadores con cargo administrador 
        res.render("planta", { layout: "index", });
    },
);

export default router;