import { Router, Request, Response, NextFunction } from 'express';
import { TiempoReal } from '../../schemas';
import Logger from '../../lib/logger';

const router = Router();

const logger = Logger();

router.post(
    "/data-tiempo-real",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.debug("POST /data-tiempo-real");
            logger.debug(req.body);
            const { clave, valor, tipo}  = req.body;
            if (!clave || !valor || !tipo) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const tiempoReal = await TiempoReal.findOne({ where: { clave } });
            if (tiempoReal) {
                await tiempoReal.update({ valor, tipo });
            }
            else {
                await TiempoReal.create({ clave, valor, tipo });
            }

            res.sendStatus(204);

        } catch (error) {
            
        }
    },
);


export default router;