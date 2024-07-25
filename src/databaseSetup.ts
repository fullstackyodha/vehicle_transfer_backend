import { DataSource } from 'typeorm';
import { Driver } from '@/features/drivers/models/Driver.model';
import { Vehicle } from '@/features/vehicles/models/Vehicle.model';
import { AssignedVehicles } from './features/assign/model/assign.model';
import { TransferHistory } from './features/transfers/models/transfer.model';

export let AppDataSource: DataSource;

export default function () {
    const connectDB = () => {
        AppDataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'test',
            database: 'vehicle_transfer_db',
            synchronize: true,
            logging: true,
            entities: [Driver, Vehicle, AssignedVehicles, TransferHistory],
            subscribers: [],
            migrations: []
        });

        AppDataSource.initialize()
            .then(() => {
                console.log('Connected To Database Successfully');
            })
            .catch((err) => {
                console.error('Error Connecting To Database', err);
            });
    };

    connectDB();
}
