import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import { errorMiddleware } from '../middleware/error.middleware';
import { generalLimiter } from '../middleware/rate-limiter.middleware';
import authRouter from '../routes/auth.route';
import userRouter from '../routes/user.route';
import configs from '../utils/configs';

dotenv.config();

export default class App {
    private app: Express;
    private readonly PORT: number | string;

    constructor() {
        this.app = express();
        this.PORT = configs.port;

        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandler();
    }

    private setupMiddlewares(): void {
        this.app.use(
            cors({
                origin: 'http://localhost:5173',
                credentials: true,
            }),
        );
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(generalLimiter);
    }

    private setupErrorHandler(): void {
        this.app.use(errorMiddleware);
    }

    private setupRoutes(): void {
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/users', userRouter);
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}
