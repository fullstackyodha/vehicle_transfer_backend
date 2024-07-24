import { Application } from 'express';
import { driverRoutes } from '@/features/drivers/routes/driver.routes';
import { vehicleRoutes } from './features/vehicles/routes/vehicle.routes';

export default (app: Application) => {
    const routes = () => {
        app.use('/api/v1/drivers', driverRoutes.routes());

        app.use('/api/v1/vehicles', vehicleRoutes.routes());
    };

    routes();
};
