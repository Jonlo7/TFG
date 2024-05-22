import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session.trabajador) {
        next();
    } else if (req.path !== '/login' && req.path !== '/register') {
        res.redirect('/login');
    }
}

export function requirePLCAuth(req: Request, res: Response, next: NextFunction) {
    // get the basic auth credentials from request
    const auth = { login: process.env.PLC_LOGIN_USER, password: process.env.PLC_LOGIN_PASSWORD }

    // check that the credentials match
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [login, password] = credentials.split(':');

    // check credentials
    if (login && password && login === auth.login && password === auth.password) {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic');
        res.status(401).json({ message: 'Access Denied' });
    }
}