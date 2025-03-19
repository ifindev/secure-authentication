import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { errorMiddleware } from '../middleware/error.middleware';
import authRouter from '../routes/auth.route';
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
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private setupErrorHandler(): void {
        this.app.use(errorMiddleware);
    }

    private setupRoutes(): void {
        this.app.use('/api/auth', authRouter);
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}
