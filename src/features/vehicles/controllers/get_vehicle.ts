import { VehicleService } from '@/services/vehicle.service';
import { BadRequestError, CustomError } from '@/utils/ErrorHandler';
import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from 'http-status-codes';

export const getAllVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allVehicle = await VehicleService.getAllVehicle();

        if (!allVehicle) {
            throw new BadRequestError('Error Getting Vehicle Data');
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'All Vehicles Data',
            data: { vehicles: [...allVehicle] }
        });
    } catch (error: CustomError | any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};

export const getVehicleByNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { number } = req.params;

        const vehicle = await VehicleService.getVehicleByNumber(number);

        if (!vehicle) {
            throw new BadRequestError(`Vehicle Number ${number} don't exist`);
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'Vehicle Data',
            data: { vehicle }
        });
    } catch (error: CustomError | any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};
