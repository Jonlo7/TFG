import { Router, Request, Response, NextFunction } from 'express';
import { Alarmas, HistorialAlarmas, Lote, TiempoReal, Trabajador, TurnoTrabajado } from '../../schemas';
import { checkPassword, hashPassword } from '../../lib/crypto';
import { requireAuth } from '../middlewares/auth';
import { APIError } from '../error/APIError';
import { Op } from '@sequelize/core';

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

            await TurnoTrabajado.create({id_Turno: req.sessionID, fechaLogin: new Date(), id_Trabajador: trabajador.id_Trabajador});
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
        await TurnoTrabajado.update({fechaLogout: new Date()}, {where: {id_Trabajador: req.session.trabajador!.id_Trabajador, fechaLogout: {
            //if loggedout 5 minutes ago
            [Op.lt]: new Date(new Date().getTime() - 5 * 60 * 1000)
        }}});
        req.session.destroy(() => {
            res.redirect("/login");
        });
    },
);
export default router;
