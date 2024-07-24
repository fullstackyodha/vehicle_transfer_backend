import { AppDataSource } from '@/databaseSetup';
import { VehicleData } from '@/features/vehicles/interfaces/vehicle.interface';
import { Vehicle } from '@/features/vehicles/models/Vehicle.model';

export class VehicleService {
    static async createVehicle(vehicleData: VehicleData) {
        try {
            const vehicleRepository = AppDataSource.getRepository(Vehicle);

            const vehicle = vehicleRepository.create(vehicleData);

            await vehicleRepository.save(vehicle);

            return vehicle;
        } catch (error) {
            console.error('Error saving vehicle:', error);
        }
    }

    static async getAllVehicle() {
        const vehicleRepository = AppDataSource.getRepository(Vehicle);

        const vehicles = await vehicleRepository.find();

        return vehicles;
    }

    static async getVehicleByNumber(vehicleNumber: string) {
        const vehicleRepository = AppDataSource.getRepository(Vehicle);

        const vehicle = await vehicleRepository.findOneBy({ vehicleNumber });

        return vehicle;
    }
}
