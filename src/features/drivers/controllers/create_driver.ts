import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/utils/ErrorHandler';
import { DriverService } from '@/services/drivers.service';
import HTTP_STATUS from 'http-status-codes';

export const createDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, phoneNumber } = JSON.parse(req.body.driverData);
        const profilePhoto = req.file?.path || '';

        // console.log('Data: ', name, phoneNumber);
        // console.log('Profile Photo: ', profilePhoto);

        // Find driver by phone number
        const exisitngDriver = await DriverService.findDriverByPhoneNumber(phoneNumber);

        // If phone number already present throw error
        if (exisitngDriver) {
            throw new BadRequestError('Driver already exisit with this Phone Number');
        }

        // Create The Driver
        const createdDriver = await DriverService.createDriver({
            name,
            phoneNumber,
            profilePhoto
        });

        // If driver not created throw error
        if (!createdDriver) {
            throw new BadRequestError('Error Creating Driver.');
        }

        // Else return response
        res.status(HTTP_STATUS.OK).json({
            message: 'Driver created successfully',
            data: { ...createdDriver }
        });
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            err
        });
    }
};
