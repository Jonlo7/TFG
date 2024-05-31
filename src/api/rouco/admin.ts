import { Router, Request, Response, NextFunction } from 'express';
import { Trabajador,Cargo} from '../../schemas';

const router = Router();

router.get(
    "/admin",
    async (req: Request, res: Response, next: NextFunction) => {   
        const trabajador = req.session.trabajador;
        let isAdmin: boolean = trabajador?.id_Cargo === '5262b2a3-328e-4843-bede-cd02a21e5d49';         
        res.render("admin", { layout: "index", isAdmin: isAdmin});
    },
);

export default router;