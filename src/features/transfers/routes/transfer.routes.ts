import express, { Router } from 'express';
import {
    createTransfer,
    getAllTransferedVehicle,
    getTransferHistoryByVehicleNumber
} from '../controllers/transfer';

class TransferRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/', createTransfer);

        this.router.get('/vehicles', getAllTransferedVehicle);

        this.router.get('/history/:vehicleNumber', getTransferHistoryByVehicleNumber);

        return this.router;
    }
}

export const transferRoutes: TransferRoutes = new TransferRoutes();
