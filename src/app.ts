import express, { Express } from 'express';
import { Server } from '@/serverSetup';
import connectDB from '@/databaseSetup';

class VehicleTransferBackend {
    public initialize(): void {
        const expressApp: Express = express();

        const server = new Server(expressApp);

        server.start();

        connectDB();
    }
}

export const app: VehicleTransferBackend = new VehicleTransferBackend();
app.initialize();
