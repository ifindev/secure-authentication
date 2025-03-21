import express from 'express';

import AuthController from '../controllers/auth.controller';
import { loginLimiter, refreshLimiter } from '../middleware/rate-limiter.middleware';

const authRouter = express.Router();

authRouter.post('/login', loginLimiter, AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.post('/refresh-token', refreshLimiter, AuthController.refreshAccessToken);

export default authRouter;
