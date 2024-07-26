import express, { Router } from 'express';
import { createDriver } from '@/features/drivers/controllers/create_driver';
import { upload } from '@/app';
import { getAllDriver, getDriverById, getDriverProfileImage } from '../controllers/get_drivers';

class DriverRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        // req object will be populated with a file object containing information about the processed file.
        this.router.post('/create', upload.single('profilePhoto'), createDriver);

        this.router.get('/allDrivers', getAllDriver);

        this.router.get('/:id', getDriverById);

        this.router.get('/profilePhoto/:fileName', getDriverProfileImage);

        return this.router;
    }
}

export const driverRoutes: DriverRoutes = new DriverRoutes();
