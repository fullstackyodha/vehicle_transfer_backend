import { Application } from 'express';
import { driverRoutes } from '@/features/drivers/routes/driver.routes';

export default (app: Application) => {
    const routes = () => {
        app.use('/api/v1/drivers', driverRoutes.routes());
    };

    routes();
};
