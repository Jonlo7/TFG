import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get(
    "/historicos",
    async (req: Request, res: Response, next: NextFunction) => {
        
        res.render("historicos", { layout: "index", });
    },
);

export default router;