import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/utils/ErrorHandler';
import { VehicleService } from '@/services/vehicle.service';
import HTTP_STATUS from 'http-status-codes';

export const checkIfVehicleExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vehicleNumber } = JSON.parse(req.body.vehicleData);

        const exisitngVehicle = await VehicleService.getVehicleByNumber(vehicleNumber);

        if (exisitngVehicle) {
            return res.status(400).json({ error: 'Vehicle already exists' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vehicleNumber, vehicleType } = JSON.parse(req.body.vehicleData);

        const pucCertificate =
            req.files && 'pucCertificate' in req.files ? req.files['pucCertificate'][0].path : '';

        const insuranceCertificate =
            req.files && 'insuranceCertificate' in req.files
                ? req.files['insuranceCertificate'][0].path
                : '';

        if (!pucCertificate || !insuranceCertificate) {
            throw new BadRequestError('Please upload PUC and Insurance certificates');
        }

        // Create The Vehicle
        const createdVehicle = await VehicleService.createVehicle({
            vehicleNumber,
            vehicleType,
            pucCertificate,
            insuranceCertificate
        });

        // If vehicle not created throw error
        if (!createdVehicle) {
            throw new BadRequestError('Error Creating Vehicle.');
        }

        // Else return response
        res.status(HTTP_STATUS.OK).json({
            message: 'Vehicle created successfully',
            data: { ...createdVehicle }
        });
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: 'Error creating vehicle.'
        });
    }
};
