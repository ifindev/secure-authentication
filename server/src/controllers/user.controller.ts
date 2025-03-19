import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import UserService from '../services/user.service';

export default class UserController {
    static async getUserProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(status.UNAUTHORIZED).json({
                    error: 'Not authenticated',
                });
                return;
            }

            const user = await UserService.getUserProfile(userId);

            if (!user) {
                res.status(status.NOT_FOUND).json({
                    error: 'User not found',
                });
                return;
            }

            res.status(status.OK).json(user);
        } catch (error) {
            next(error);
        }
    }
}
