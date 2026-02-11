
import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';
import { createTransactionSchema } from '../utils/dto';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const validation = createTransactionSchema.safeParse(req.body);
        if (!validation.success) {
            return errorResponse(res, validation.error.message, 400);
        }

        const transaction = await transactionService.createTransaction(userId, validation.data);
        successResponse(res, transaction, 'Transaction created successfully');
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'Category not found or does not belong to user' ? 404 : 500;
            errorResponse(res, error.message, statusCode);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const transactions = await transactionService.getTransactions(userId);
        successResponse(res, transactions, 'Transactions retrieved successfully');
    } catch (error) {
        errorResponse(res, 'Failed to retrieve transactions');
    }
};

export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const transactionId = parseInt(req.params.id as string);
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        const transaction = await transactionService.getTransactionById(userId, transactionId);
        successResponse(res, transaction, 'Transaction retrieved successfully');
    } catch (error) {
        if (error instanceof Error) {
            errorResponse(res, error.message, 404);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const transactionId = parseInt(req.params.id as string);
        if (!userId) return errorResponse(res, 'Unauthorized', 401);

        await transactionService.deleteTransaction(userId, transactionId);
        successResponse(res, null, 'Transaction deleted successfully');
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'Transaction not found' ? 404 : 500;
            errorResponse(res, error.message, statusCode);
        } else {
            errorResponse(res, 'An unknown error occurred');
        }
    }
};
