import { Router, Request, Response, NextFunction } from 'express';
import { TiempoReal,HistorialAlarmas,Lote,Alarmas } from '../../schemas';

const router = Router();

router.get(
    "/historicos",
    async (req: Request, res: Response, next: NextFunction) => {
        const trabajador = req.session.trabajador;
        let isAdmin: boolean = trabajador?.id_Cargo === '5262b2a3-328e-4843-bede-cd02a21e5d49';
        const historialLotes = (await Lote.findAll()).map(lote => lote.toJSON());
        const historialAlarmas = (await HistorialAlarmas.findAll()).map(historialAlarma => historialAlarma.toJSON());
        res.render("historicos", { layout: "index", isAdmin: isAdmin, historialAlarmas, historialLotes});
    },
);
//crear una nueva fila en la tabla historial alarmas y meter la id_alarma, el id_lote y la horaSalto que vienen en el body
router.post(
    "/flanco-ascendente",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idAlarma,horaSalto, idLote } = req.body.body;
            await HistorialAlarmas.create({
                id_Alarma: idAlarma,
                id_Lote: idLote,
                horaSalto
            });
            res.json({
                message: "Alarma registrada con éxito"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);
router.post(
    "/flanco-descendente",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idAlarma,horaSalto, idLote,horaResolucion } = req.body.body;
            await HistorialAlarmas.update({ horaResolucion }, {
                where: {
                    id_Alarma: idAlarma,
                    id_Lote: idLote,
                    horaSalto
                }
            });
            res.json({
                message: "Alarma resuelta con éxito"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);


router.get(
    "/alarmas",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const todasAlarmas = await Alarmas.findAll();
            res.json({
                todasAlarmas
            });
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    "/lotes",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const todosLotes = await Lote.findAll();
            res.json({
                todosLotes
            });
        } catch (error) {
            next(error);
        }
    },
);

router.post(
    "/nuevo-lote"
    , async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {numLote, horaInicio } = req.body.body;
            await Lote.create({
                numLote,
                horaInicio,
                botellasCorrectas: 0,
                horaFin: new Date(0),
            });
            res.json({
                message: "Lote creado con éxito"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.post(
    "/fin-lote"
    , async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {numLote, horaInicio, horaFin, botellasCorrectas } = req.body.body;
            await Lote.update({ horaFin, botellasCorrectas }, {
                where: {
                    numLote,
                    horaInicio
                }
            });
            res.json({
                message: "Lote finalizado con éxito"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);	





export default router;