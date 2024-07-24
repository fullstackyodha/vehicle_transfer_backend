import { DriverService } from '@/services/drivers.service';
import { BadRequestError, CustomError } from '@/utils/ErrorHandler';
import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from 'http-status-codes';

export const getAllDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allDrivers = await DriverService.getAllDrivers();

        if (!allDrivers) {
            throw new BadRequestError('Error Getting Driver Data');
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'All Drivers Data',
            data: { drivers: [...allDrivers] }
        });
    } catch (error: CustomError | any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};

export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const driver = await DriverService.getDriverById(+id);

        if (!driver) {
            throw new BadRequestError(`Driver with id ${id} not found`);
        }

        res.status(HTTP_STATUS.OK).json({
            message: 'Driver Data',
            data: { driver }
        });
    } catch (error: CustomError | any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};
