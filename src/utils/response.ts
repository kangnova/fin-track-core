
import { Request, Response } from 'express';

export const successResponse = (res: Response, data: any, message: string = 'Success') => {
    res.status(200).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res: Response, message: string, statusCode: number = 500) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};
