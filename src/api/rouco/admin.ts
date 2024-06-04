import { Router, Request, Response, NextFunction } from 'express';
import { Trabajador,Cargo} from '../../schemas';
import { APIError } from '../error/APIError'; 

const router = Router();

router.get(
    "/admin",
    async (req: Request, res: Response, next: NextFunction) => {   
        const trabajador = req.session.trabajador;
        let isAdmin: boolean = trabajador?.id_Cargo === '5262b2a3-328e-4843-bede-cd02a21e5d49';      
        const trabajadores = (await Trabajador.findAll()).map(trabajador => trabajador.toJSON());   
        const cargos = (await Cargo.findAll()).map(cargo => cargo.toJSON());
        res.render("admin", { layout: "index", isAdmin: isAdmin,trabajadores,cargos});
    },
);
//verify if user already created, if not create user
router.post(
    "/add-trabajador",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nombre, apellido, email, password, id_Cargo } = req.body;
            const trabajador = await Trabajador.findOne({
                where: {
                    email,
                },
            });
            if (trabajador) throw new APIError("Ya existe", true);
            await Trabajador.create({nombre, apellido, email, passwordHash: password, id_Cargo});
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
);

//ver si el usuario ya existe y si es asi eliminarlo 
router.post(
    "/delete-trabajador",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id_Trabajador } = req.body;
            const trabajador = await Trabajador.findOne({
                where: {
                    id_Trabajador,
                },
            });
            if (!trabajador) throw new APIError("No existe", true);
            await trabajador.destroy();
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
);



export default router;