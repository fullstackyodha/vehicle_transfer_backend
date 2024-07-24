import express, { Router } from 'express';
import { createVehicle } from '@/features/vehicles/controllers/create_vehicle';
import { getAllVehicle, getVehicleByNumber } from '@/features/vehicles/controllers/get_vehicle';
import { upload } from '@/app';

class VehicleRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post(
            '/create',
            upload.fields([
                { name: 'pucCertificate', maxCount: 1 },
                { name: 'insuranceCertificate', maxCount: 1 }
            ]),
            createVehicle
        );

        this.router.get('/allVehicles', getAllVehicle);

        this.router.get('/:number', getVehicleByNumber);

        return this.router;
    }
}

export const vehicleRoutes: VehicleRoutes = new VehicleRoutes();
