import { AppDataSource } from '@/databaseSetup';
import { AssignedVehicles } from '@/features/assign/model/assign.model';

export class AssignService {
    static async assignVehicle(assignmentId: string, driverId: number, vehicleNumber: string) {
        const assignRepository = AppDataSource.getRepository(AssignedVehicles);

        const assignedVehicle = await assignRepository.save({
            assignmentId,
            vehicleNumber,
            driverId,
            assignedDate: new Date().toISOString()
        });

        return assignedVehicle;
    }

    static async getAllAssignedVehicle() {
        const assignRepository = AppDataSource.getRepository(AssignedVehicles);

        const query = `
                SELECT ranked."assignedDate", ranked."vehicleNumber", vehicle."vehicleType",
                       driver.id, driver.name, driver."phoneNumber", driver."profilePhoto" 
                FROM (
                    SELECT
                        "vehicleNumber",
                        "driverId",
                        "assignedDate",
                        RANK() OVER (PARTITION BY "vehicleNumber" ORDER BY "assignedDate" DESC) as rank
                    FROM assigned_vehicles
                ) as ranked
                INNER JOIN vehicle ON ranked."vehicleNumber" = vehicle."vehicleNumber"
                INNER JOIN driver ON ranked."driverId" = driver.id
                WHERE rank = 1
                ORDER BY ranked."assignedDate" DESC
            `;

        const assignedVehicle = await assignRepository.query(query);

        return assignedVehicle;
    }
}
