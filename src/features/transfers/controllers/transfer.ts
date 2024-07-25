import { Request, Response, NextFunction } from 'express';
import { TransferService } from '@/services/transfer.service';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@/utils/ErrorHandler';
import { AssignService } from '@/services/assign.service';

export const createTransfer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fromDriverId, toDriverId, vehicleNumber } = req.body;
        if (toDriverId === '') {
            throw new BadRequestError('Too Cannot be empty');
        }

        if (fromDriverId === toDriverId) {
            throw new BadRequestError('Cannot Transfer Vehicle to the same person');
        }

        const createdTransfer = await TransferService.transferVehicle(
            fromDriverId,
            toDriverId,
            vehicleNumber
        );

        const assignedDriver = await AssignService.assignVehicle(toDriverId, vehicleNumber);

        if (!createdTransfer || !assignedDriver) {
            throw new BadRequestError('Error creating transfer');
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'Vehicle Transfered Successfully.',
            data: { vehicleNumber, fromDriverId, toDriverId }
        });
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: `${err}`
        });
    }
};

export const getTransferHistoryByVehicleNumber = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // try {
    //     const { vehicleNumber } = req.params;
    //     const vehicle_id = await VehicleService.getVehicleByNumber(vehicleNumber);
    //     const transferHistory = await TransferService.getTansferHistory(vehicle_id);
    //     res.status(HTTP_STATUS.OK).json({
    //         message: 'Transfer History',
    //         data: {
    //             transfers: transferHistory
    //         }
    //     });
    // } catch (err) {
    //     res.status(HTTP_STATUS.BAD_REQUEST).json({
    //         message: `${err}`
    //     });
    // }
};

export const getAllTransferedVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allTransferedvehicles = await TransferService.getAllTransferedVehicleData();

        res.status(HTTP_STATUS.OK).json({
            message: '',
            data: {
                vehicles: allTransferedvehicles
            }
        });
    } catch (err) {}
};
