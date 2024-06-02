import { Router, Request, Response, NextFunction } from 'express';
import { TiempoReal,Botones} from '../../schemas';
import { set } from 'shelljs';

const router = Router();


router.get(
    "/maquina-llenadora",
    async (_req: Request, res: Response, next: NextFunction) => {
        const trabajador = _req.session.trabajador;
        let isAdmin: boolean = trabajador?.id_Cargo === '5262b2a3-328e-4843-bede-cd02a21e5d49';
        let isTecnico: boolean = trabajador?.id_Cargo === '4517e5b7-e8a9-43b3-879b-c1a2de8d7278';
        res.render("maquinaLlenadora", { layout: "index", isAdmin: isAdmin, isTecnico: isTecnico});
    },
);

router.get(
    "/tiempo-real",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const todasTiempoReal = await TiempoReal.findAll();
            res.json({
                todasTiempoReal
            });
        } catch (error) {
            next(error);
        }
    },
);


router.post(
    "/botones",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { bWEBMarcha, bWEBAspiradora, bWEBCinta,bWEBCrearLote,bWEBEmergencia,bWEBModoAuto,bWEBMotorLlenadora,bWEBParo,bWEBResetCounterEntrada,bWEBResetCounterSalida,bWEBTerminarLote,bWEBValvula } = req.body;
            if (bWEBMarcha) {
                await Botones.upsert({
                    id_Boton: 'bWEBMarcha',
                    valor: Boolean(bWEBMarcha)
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBMarcha',
                        valor: false
                    });
                }, 500);
            }
            

           if (bWEBAspiradora) {
                await Botones.upsert({
                    id_Boton: 'bWEBAspiradora',
                    valor: bWEBAspiradora
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBAspiradora',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBCinta) {
                await Botones.upsert({
                    id_Boton: 'bWEBCinta',
                    valor: bWEBCinta
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBCinta',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBCrearLote) {
                await Botones.upsert({
                    id_Boton: 'bWEBCrearLote',
                    valor: bWEBCrearLote
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBCrearLote',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBEmergencia) {
                await Botones.upsert({
                    id_Boton: 'bWEBEmergencia',
                    valor: bWEBEmergencia
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBEmergencia',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBModoAuto) {
                await Botones.upsert({
                    id_Boton: 'bWEBModoAuto',
                    valor: bWEBModoAuto
                });
            }

            if (bWEBMotorLlenadora) {
                await Botones.upsert({
                    id_Boton: 'bWEBMotorLlenadora',
                    valor: bWEBMotorLlenadora
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBMotorLlenadora',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBParo) {
                await Botones.upsert({
                    id_Boton: 'bWEBParo',
                    valor: bWEBParo
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBParo',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBResetCounterEntrada) {
                await Botones.upsert({
                    id_Boton: 'bWEBResetCounterEntrada',
                    valor: bWEBResetCounterEntrada
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBResetCounterEntrada',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBResetCounterSalida) {
                await Botones.upsert({
                    id_Boton: 'bWEBResetCounterSalida',
                    valor: bWEBResetCounterSalida
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBResetCounterSalida',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBTerminarLote) {
                await Botones.upsert({
                    id_Boton: 'bWEBTerminarLote',
                    valor: bWEBTerminarLote
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBTerminarLote',
                        valor: false
                    });
                }, 500);
            }

            if (bWEBValvula) {
                await Botones.upsert({
                    id_Boton: 'bWEBValvula',
                    valor: bWEBValvula
                });
                setTimeout(() => {
                    Botones.upsert({
                        id_Boton: 'bWEBValvula',
                        valor: false
                    });
                }, 500);
            } 
            res.json({ message: 'Botones actualizados' });
        } catch (error) {
            next(error);
        }
    },
);
export default router;