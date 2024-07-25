import { Application } from 'express';
import { driverRoutes } from '@/features/drivers/routes/driver.routes';
import { vehicleRoutes } from './features/vehicles/routes/vehicle.routes';
import { assignRoutes } from './features/assign/routes/assign.routes';
import { transferRoutes } from './features/transfers/routes/transfer.routes';

export default (app: Application) => {
    const routes = () => {
        app.use('/api/v1/drivers', driverRoutes.routes());

        app.use('/api/v1/vehicles', vehicleRoutes.routes());

        app.use('/api/v1/assign', assignRoutes.routes());

        app.use('/api/v1/transfer', transferRoutes.routes());
    };

    routes();
};
