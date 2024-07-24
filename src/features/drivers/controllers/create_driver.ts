import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/utils/ErrorHandler';
import { DriverService } from '@/services/drivers.service';
import HTTP_STATUS from 'http-status-codes';
import fs from 'fs';

export const createDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, phoneNumber } = JSON.parse(req.body.driverData);
        const profilePhoto = req.file?.filename || '';

        if (!profilePhoto) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Please upload Profile Photo'
            });
        }

        // Find driver by phone number
        const exisitngDriver = await DriverService.findDriverByPhoneNumber(phoneNumber);

        // If driver already present remove files and send error message
        if (exisitngDriver) {
            fs.rm('./uploads/profilePhotos/' + profilePhoto, () => {});

            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Driver already exisit with this Phone Number'
            });
        }

        // Create The Driver
        const createdDriver = await DriverService.createDriver({
            name,
            phoneNumber,
            profilePhoto
        });

        // If driver not created throw error
        if (!createdDriver) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Error Creating Driver.'
            });
        }

        // Else return response
        res.status(HTTP_STATUS.OK).json({
            message: 'Driver created successfully',
            data: { ...createdDriver }
        });
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: 'Internal Server Error'
        });
    }
};
