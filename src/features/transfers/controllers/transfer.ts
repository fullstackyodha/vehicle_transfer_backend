import { Request, Response, NextFunction } from 'express';
import { TransferService } from '@/services/transfer.service';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError, CustomError } from '@/utils/ErrorHandler';
import { AssignService } from '@/services/assign.service';
import { v4 as uuidv4 } from 'uuid';

export const createTransfer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fromDriverId, toDriverId, vehicleNumber } = req.body;
        if (toDriverId === '') {
            throw new BadRequestError('Too Cannot be empty');
        }

        if (fromDriverId === toDriverId) {
            throw new BadRequestError('Cannot Transfer Vehicle to the same person');
        }

        const transferId = 'TR/' + uuidv4();

        const createdTransfer = await TransferService.transferVehicle(
            transferId,
            vehicleNumber,
            +fromDriverId,
            +toDriverId
        );

        const assignedDriver = await AssignService.assignVehicle(
            transferId,
            toDriverId,
            vehicleNumber
        );

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
    try {
        const { vehicleNumber } = req.params;

        const transferHistory = await TransferService.getTansferHistory(vehicleNumber);

        res.status(HTTP_STATUS.OK).json({
            message: 'Transfer History',
            data: {
                transfers: transferHistory
            }
        });
    } catch (error: CustomError | any) {
        res.status(error.status_code).json({
            message: error.message
        });
    }
};

// export const getAllTransferedVehicle = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const allTransferedvehicles = await TransferService.getAllTransferedVehicleData();

//         res.status(HTTP_STATUS.OK).json({
//             message: 'All Transfered Vehicles',
//             data: {
//                 vehicles: allTransferedvehicles
//             }
//         });
//     } catch (error: CustomError | any) {
//         res.status(error.status_code).json({
//             message: error.message
//         });
//     }
// };
