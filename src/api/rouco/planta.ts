import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get(
    "/",
    async (_req: Request, res: Response, next: NextFunction) => {
        res.render("planta", { layout: "index", });
    },
);

export default router;