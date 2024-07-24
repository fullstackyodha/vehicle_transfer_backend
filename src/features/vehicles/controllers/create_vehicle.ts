import { Request, Response, NextFunction } from 'express';
import { VehicleService } from '@/services/vehicle.service';
import HTTP_STATUS from 'http-status-codes';
import fs from 'fs';
import { BadRequestError, CustomError } from '@/utils/ErrorHandler';

export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vehicleNumber, vehicleType } = JSON.parse(req.body.vehicleData);

        const pucCertificate =
            req.files && 'pucCertificate' in req.files
                ? req.files['pucCertificate'][0].filename
                : '';

        const insuranceCertificate =
            req.files && 'insuranceCertificate' in req.files
                ? req.files['insuranceCertificate'][0].filename
                : '';

        if (!pucCertificate || !insuranceCertificate) {
            throw new BadRequestError('Please upload PUC and Insurance certificates');
        }

        const exisitingVehicle = await VehicleService.getVehicleByNumber(vehicleNumber);

        if (exisitingVehicle) {
            fs.rm('./uploads/pucCertificates/' + pucCertificate, () => {});
            fs.rm('./uploads/insuranceCertificates/' + insuranceCertificate, () => {});

            throw new BadRequestError('Vehicle already exists');
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
    } catch (error: CustomError | any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};
