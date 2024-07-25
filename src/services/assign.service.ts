import { AppDataSource } from '@/databaseSetup';
import { AssignedVehicles } from '@/features/assign/model/assign.model';
import { BadRequestError, CustomError, NotFoundError } from '@/utils/ErrorHandler';

export class AssignService {
    static async assignVehicle(driverId: string, vehicleNumber: string) {
        const assignRepository = AppDataSource.getRepository(AssignedVehicles);

        const assignedVehicle = await assignRepository.save({
            vehicleNumber,
            driverId,
            assignedDate: new Date().toISOString()
        });

        return assignedVehicle;
    }

    static async getAllAssignedVehicle() {
        const assignRepository = AppDataSource.getRepository(AssignedVehicles);

        const query = `
                SELECT *
                FROM (
                    SELECT
                        vehicleNumber,
                        driverId,
                        assignedDate,
                        RANK() OVER (PARTITION BY vehicleNumber ORDER BY assignedDate DESC) as rank
                    FROM assigned
                ) as ranked
                INNER JOIN vehicle ON ranked.vehicleNumber = vehicle.vehicleNumber
                INNER JOIN driver ON ranked.driverId = driver.id
                WHERE rank = 1
            `;

        const assignedVehicle = await assignRepository.query(query);

        return assignedVehicle;
    }
}