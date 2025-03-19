import express from 'express';

import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/refresh-token', AuthController.refreshAccessToken);

export default authRouter;
