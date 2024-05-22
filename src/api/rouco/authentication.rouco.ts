import { Router, Request, Response, NextFunction } from 'express';
import { Trabajador } from '../../schemas';
import { checkPassword, hashPassword } from '../../lib/crypto';
import { requireAuth } from '../middlewares/auth';
import { APIError } from '../error/APIError';

const router = Router();


router.get(
    "/login",
    async (_req: Request, res: Response, next: NextFunction) => {
        res.render("login", { layout: "empty", });
    },
);

router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw new APIError("email and password are required", true);

            const trabajador = await Trabajador.findOne({
                where: {
                    email,
                },
            });
            if (!trabajador) throw new APIError("Invalid email or password", true);

            const passwordMatch = checkPassword(password, trabajador.passwordHash);
            if (!passwordMatch) throw new APIError("Invalid email or password", true);

            req.session.trabajador = trabajador;
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/modify-trabajador",
    requireAuth,
    async (req: Request, res: Response, _next: NextFunction) => {
        res.render("modify-trabajador", { layout: "index", trabajador: req.session.trabajador});
    },
);

router.post(
    "/modify-trabajador",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { password } = req.body;
            if (!password) throw new APIError("password is required", true);
            
            const trabajador = await Trabajador.findOne({
                where: {
                    id_Trabajador: req.session.trabajador!.id_Trabajador,
                },
            });
            if (!trabajador) throw new APIError("Invalid email or password", true);

            trabajador.passwordHash = hashPassword(password);
            await trabajador.save();

            // expire session
            req.session.destroy(() => {
                res.redirect("/login");
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/logout",
    requireAuth,
    async (req: Request, res: Response, _next: NextFunction) => {
        req.session.destroy(() => {
            res.redirect("/login");
        });
    },
);

export default router;