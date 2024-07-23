import { AppDataSource } from '@/databaseSetup';
import { DriverData } from '@/features/drivers/interfaces/drivers.interface';
import { Driver } from '@/features/drivers/models/Driver.model';
import { Repository } from 'typeorm';

export class DriverService {
    static async createDriver(driverData: DriverData) {
        try {
            const driverRepository: Repository<Driver> = AppDataSource.getRepository(Driver);

            const driver: Driver = driverRepository.create(driverData);

            await driverRepository.save(driver);

            return driver;
        } catch (error) {
            console.error('Error saving driver', error);
        }
    }

    static async findDriverByPhoneNumber(phoneNumber: string) {
        const driverRepository = AppDataSource.getRepository(Driver);

        const driver = await driverRepository.findOneBy({ phoneNumber });

        return driver;
    }

    static async getAllDrivers() {
        const driverRepository = AppDataSource.getRepository(Driver);

        const drivers = await driverRepository.find();

        return drivers;
    }

    static async getDriverById(id: number) {
        const driverRepository = AppDataSource.getRepository(Driver);

        const driver = await driverRepository.findOneBy({ id });

        return driver;
    }
}
