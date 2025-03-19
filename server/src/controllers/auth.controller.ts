import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { LoginRequest } from '../models/auth.model';
import AuthService from '../services/auth.service';
import configs from '../utils/configs';

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const response = await AuthService.login(request);

      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: true,
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
}
