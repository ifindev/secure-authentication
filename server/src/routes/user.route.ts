import express from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const userRouter = express.Router();

userRouter.use(authenticateToken);
userRouter.get('/profile', UserController.getUserProfile);

export default userRouter;
