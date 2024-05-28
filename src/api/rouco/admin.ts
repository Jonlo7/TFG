import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get(
    "/admin",
    async (req: Request, res: Response, next: NextFunction) => {   
                 
        res.render("admin", { layout: "index", });
    },
);

export default router;