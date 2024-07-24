// import { VehicleService } from '@/services/vehicles.service';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Request, Response, NextFunction } from 'express';

export const getAllVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const allVehicle = await VehicleService.getAllVehicle();
        // if (!allVehicle) {
        //     throw new BadRequestError('Error Getting Vehicle Data');
        // }
        // res.status(200).json({
        //     message: 'All Vehicles Data',
        //     data: { vehicles: [...allVehicle] }
        // });
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
};

export const getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const { id } = req.params;
        // const vehicle = await VehicleService.getVehicleById(id);
        // if (!vehicle) {
        //     throw new BadRequestError(`Vehicle with id ${id} not found`);
        // }
        // res.status(200).json({
        //     message: 'Vehicle Data',
        //     data: { vehicle }
        // });
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
};
