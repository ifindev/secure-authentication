import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import JWT from '../utils/jwt';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(status.UNAUTHORIZED).json({
            error: 'No token provided',
        });
        return;
    }

    try {
        const payload = JWT.verifyAccessToken(token);
        req.user = {
            userId: payload.userId,
        };
        next();
    } catch (error) {
        res.status(status.FORBIDDEN).json({
            error: 'Invalid or expired token',
        });
        return;
    }
};

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}
