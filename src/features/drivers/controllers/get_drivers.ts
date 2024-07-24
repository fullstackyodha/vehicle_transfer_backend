import { DriverService } from '@/services/drivers.service';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Request, Response, NextFunction } from 'express';

export const getAllDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allDrivers = await DriverService.getAllDrivers();

        if (!allDrivers) {
            throw new BadRequestError('Error Getting Driver Data');
        }

        res.status(200).json({
            message: 'All Drivers Data',
            data: { drivers: [...allDrivers] }
        });
    } catch (err) {
        res.status(400).json({
            message: err
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

        res.status(200).json({
            message: 'Driver Data',
            data: { driver }
        });
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
};
