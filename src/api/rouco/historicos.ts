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
        console.log(historialAlarmas);

        res.render("historicos", { layout: "index", isAdmin: isAdmin, historialAlarmas, historialLotes});
    },
);



export default router;