
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { registerSchema, loginSchema } from '../utils/dto';
import { successResponse, errorResponse } from '../utils/response';

export const register = async (req: Request, res: Response) => {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            return errorResponse(res, validation.error.message, 400);
        }

        const result = await authService.registerUser(validation.data);
        successResponse(res, result, 'User registered successfully');
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'User already exists' ? 409 : 500;
            errorResponse(res, error.message, statusCode);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return errorResponse(res, validation.error.message, 400);
        }

        const result = await authService.loginUser(validation.data);
        successResponse(res, result, 'Login successful');
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'Invalid email or password' ? 401 : 500;
            errorResponse(res, error.message, statusCode);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;

        if (!userId) {
            return errorResponse(res, 'Unauthorized', 401);
        }

        const user = await authService.getUserProfile(userId);
        successResponse(res, user, 'Profile retrieved successfully');
    } catch (error) {
        if (error instanceof Error) {
            errorResponse(res, error.message, 404);
        } else {
            errorResponse(res, 'Failed to retrieve profile');
        }
    }
}
