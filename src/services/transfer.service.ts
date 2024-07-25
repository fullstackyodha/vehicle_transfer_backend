import { AppDataSource } from '@/databaseSetup';
import { TransferHistory } from '@/features/transfers/models/transfer.model';

export class TransferService {
    static async transferVehicle(vehicleNumber: string, fromDriverId: string, toDriverId: string) {
        try {
            const transferData = {
                vehicleNumber,
                fromDriverId,
                toDriverId,
                transferDate: new Date().toISOString()
            };

            const transferRepository = AppDataSource.getRepository(TransferHistory);

            const transfer = transferRepository.create(transferData);

            await transferRepository.save(transfer);

            return transfer;
        } catch (error) {
            return error;
        }
    }

    static async getTansferHistory(vehicleNumber: string) {
        try {
            const transferRepository = AppDataSource.getRepository(TransferHistory);

            const query = `
                SELECT *
                
                FROM (
                    SELECT tf.transferDate as transferDate, tf.vehicleNumber as vehicleNumber
                           drfrom.name as fromName, drfrom.phoneNumber as fromPhoneNumber,                        
                           drto.name as toName,  drto.phoneNumber as toPhoneNumber,    
                    FROM transfer_history as tf
                    INNER JOIN driver as drfrom ON tf.fromDriverId = drfrom.id
                    INNER JOIN driver as drto ON tf.toDriverId = drto.id

                ) as transfersWithName

                INNER JOIN vehicle as v ON transfersWithName.vehicleNumber = v.vehicleNumber
                
                WHERE transfersWithName.vehicleNumber = '${vehicleNumber}'
                
                ORDER BY transfersWithName.transferDate DESC
            `;

            const transferHistory = await transferRepository.query(query);

            return transferHistory;
        } catch (error) {}
    }

    static async getAllTransferedVehicleData() {
        const transferRepository = AppDataSource.getRepository(TransferHistory);

        const query = `
            SELECT *
            from vehicle
            WHERE vehicle.id IN (
                SELECT vehicle_id
                from transfers
            )
        `;

        const transferedVehicle = await transferRepository.query(query);

        return transferedVehicle;
    }
}

/*
    transfersWithName.transferDate, transfersWithName.vehicleNumber
    transfersWithName.fromName, transfersWithName.fromPhoneNumber
    transfersWithName.toName, transfersWithName.toPhoneNumber
*/
