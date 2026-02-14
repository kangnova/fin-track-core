
import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getSummary = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const summary = await dashboardService.getDashboardSummary(userId);
        successResponse(res, summary, 'Dashboard summary retrieved successfully');
    } catch (error) {
        errorResponse(res, 'Failed to retrieve dashboard summary');
    }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const stats = await dashboardService.getExpenseStats(userId);
        successResponse(res, stats, 'Expense stats retrieved successfully');
    } catch (error) {
        errorResponse(res, 'Failed to retrieve expense stats');
    }
};
