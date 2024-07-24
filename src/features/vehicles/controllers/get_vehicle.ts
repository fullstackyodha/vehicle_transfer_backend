import { VehicleService } from '@/services/vehicle.service';
import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from 'http-status-codes';

export const getAllVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allVehicle = await VehicleService.getAllVehicle();

        if (!allVehicle) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Error Getting Vehicle Data'
            });
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'All Vehicles Data',
            data: { vehicles: [...allVehicle] }
        });
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        });
    }
};

export const getVehicleByNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { number } = req.params;

        const vehicle = await VehicleService.getVehicleByNumber(number);

        if (!vehicle) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: `Vehicle Number ${number} don't exist`
            });
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'Vehicle Data',
            data: { vehicle }
        });
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        });
    }
};
