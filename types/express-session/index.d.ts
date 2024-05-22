import { Trabajador } from '../../src/schemas';

declare module 'express-session' {
    interface SessionData {
        trabajador: Trabajador;
    }
}
