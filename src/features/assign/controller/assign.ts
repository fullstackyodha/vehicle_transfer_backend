import { AssignService } from '@/services/assign.service';
import { DriverService } from '@/services/drivers.service';
import { VehicleService } from '@/services/vehicle.service';
import { BadRequestError, CustomError } from '@/utils/ErrorHandler';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import HTTP_STATUS from 'http-status-codes';

export const assignVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { driverId, vehicleNumber } = req.body;

        if (!driverId || !vehicleNumber) {
            throw new BadRequestError('All fields are required.');
        }

        const vehicle = await VehicleService.getVehicleByNumber(vehicleNumber);
        const driver = await DriverService.getDriverById(driverId);

        if (!vehicle && !driver) {
            throw new BadRequestError(`Driver and Vehicle Not Found`);
        }

        if (!vehicle) {
            throw new BadRequestError(`Vehicle with number ${vehicleNumber} Not Found`);
        }

        if (!driver) {
            throw new BadRequestError(`Driver with Id ${driverId} Not Found`);
        }

        const assignmentId = 'AS/' + uuidv4();

        const assignedDriver = await AssignService.assignVehicle(
            assignmentId,
            +driverId,
            vehicleNumber
        );

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
            throw new BadRequestError('No Data Found');
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
