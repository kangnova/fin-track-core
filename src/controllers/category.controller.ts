
import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { createCategorySchema } from '../utils/dto';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const validation = createCategorySchema.safeParse(req.body);
        if (!validation.success) {
            return errorResponse(res, validation.error.message, 400);
        }

        const category = await categoryService.createCategory(userId, validation.data.name, validation.data.type);
        successResponse(res, category, 'Category created successfully');
    } catch (error) {
        if (error instanceof Error) {
            errorResponse(res, error.message);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const categories = await categoryService.getCategories(userId);
        successResponse(res, categories, 'Categories retrieved successfully');
    } catch (error) {
        errorResponse(res, 'Failed to retrieve categories');
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const categoryId = parseInt(req.params.id as string);
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        await categoryService.deleteCategory(userId, categoryId);
        successResponse(res, null, 'Category deleted successfully');
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'Category not found' ? 404 : 500;
            errorResponse(res, error.message, statusCode);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};
