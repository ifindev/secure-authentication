import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

import COOKIE_KEYS from '../constants/cookie.constant';
import { LoginRequest } from '../models/auth.model';
import AuthService from '../services/auth.service';
import configs from '../utils/configs';

export default class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginRequest = req.body as LoginRequest;
            const response = await AuthService.login(request);

            res.cookie(COOKIE_KEYS.refreshToken, response.refreshToken, {
                httpOnly: true,
                secure: configs.nodeEnv === 'production',
                sameSite: 'strict',
                maxAge: configs.refreshTokenExpiration,
            });

            res.status(status.OK).json({
                accessToken: response.accessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    static async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const oldRefreshToken = req.cookies.refreshToken;
            if (!oldRefreshToken) {
                res.status(status.UNAUTHORIZED).json({
                    error: 'Invalid or expired refresh token',
                });
                return;
            }

            const userId = await AuthService.verifyRefreshToken(oldRefreshToken);

            if (!userId) {
                res.clearCookie(COOKIE_KEYS.refreshToken);
                res.status(status.UNAUTHORIZED).json({
                    error: 'Invalid or expired refresh token',
                });
                return;
            }

            // Rotate refresh token
            const newRefreshToken = await AuthService.renewRefreshToken(oldRefreshToken, userId);

            const newAccessToken = AuthService.generateAccessToken(userId);

            res.cookie(COOKIE_KEYS.refreshToken, newRefreshToken, {
                httpOnly: true,
                secure: configs.nodeEnv === 'production',
                sameSite: 'strict',
                maxAge: configs.refreshTokenExpiration,
            });

            res.status(status.OK).json({
                accessToken: newAccessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    // TODO: revoke this refresh token from database
    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie(COOKIE_KEYS.refreshToken);
            res.status(status.OK).json({ message: 'OK' });
        } catch (error) {
            next(error);
        }
    }
}
