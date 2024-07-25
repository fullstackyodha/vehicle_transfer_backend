import { AssignService } from '@/services/assign.service';
import { BadRequestError, CustomError } from '@/utils/ErrorHandler';
import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from 'http-status-codes';

export const assignVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { driverId, vehicleNumber } = req.body;

        const assignedDriver = await AssignService.assignVehicle(driverId, vehicleNumber);

        if (!assignedDriver) {
            throw new BadRequestError('Error assigning vehicle to the driver.');
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'Vehicle assigned to driver successfully.',
            data: { ...assignedDriver }
        });
    } catch (error: CustomError | any) {
        res.status(error.status_code).json({
            message: error.message
        });
    }
};

export const getAllAssignedVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allAssignedVehicle = await AssignService.getAllAssignedVehicle();

        if (!allAssignedVehicle) {
            throw new BadRequestError('Error getting all currently assigned vehicle.');
        }

        res.status(HTTP_STATUS.OK).json({
            data: {
                allAssignedVehicle: [...allAssignedVehicle]
            }
        });
    } catch (error: CustomError | any) {
        res.status(error.status_code).json({
            message: error.message
        });
    }
};
