import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import compression from 'compression';
import HTTP_STATUS from 'http-status-codes';
import dotenv from 'dotenv';
import 'express-async-errors';
import appRoutes from '@/routes';
import { CustomError, ErrorResponse } from '@/utils/ErrorHandler';

dotenv.config({});

export class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app: Application): void {
        app.use(helmet());
        app.use(hpp());
        app.use(
            cors({
                origin: '*',
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
            })
        );
    }

    private standardMiddleware(app: Application): void {
        app.use(compression());
        app.use(json({ limit: '50mb' }));
        app.use(urlencoded({ extended: true, limit: '50mb' }));
    }

    private routesMiddleware(app: Application): void {
        appRoutes(app);
    }

    private globalErrorHandler(app: Application): void {
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `${req.originalUrl} URL NOT FOUND`
            });
        });

        app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
            if (error instanceof CustomError) {
                return res.status(error.status_code).json(error.serializeError());
            }

            next();
        });
    }

    private async startServer(app: Application): Promise<void> {
        try {
            const httpServer: http.Server = new http.Server(app);

            httpServer.listen(process.env.PORT, () => {
                console.log(`Server running on port ${process.env.PORT}`);
            });
        } catch (err) {}
    }
}
