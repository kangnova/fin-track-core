
import prisma from '../config/database';
import { CreateTransactionDTO } from '../utils/dto';

export const createTransaction = async (userId: number, data: CreateTransactionDTO) => {
    // Validate Category ownership
    const category = await prisma.category.findFirst({
        where: { id: data.categoryId, userId }
    });

    if (!category) {
        throw new Error('Category not found or does not belong to user');
    }

    return await prisma.transaction.create({
        data: {
            userId,
            categoryId: data.categoryId,
            amount: data.amount,
            date: new Date(data.date),
            note: data.note
        },
        include: { category: true }
    });
};

export const getTransactions = async (userId: number) => {
    return await prisma.transaction.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        include: { category: true }
    });
};

export const getTransactionById = async (userId: number, transactionId: number) => {
    const transaction = await prisma.transaction.findFirst({
        where: { id: transactionId, userId },
        include: { category: true }
    });

    if (!transaction) throw new Error('Transaction not found');
    return transaction;
};

export const deleteTransaction = async (userId: number, transactionId: number) => {
    const transaction = await prisma.transaction.findFirst({
        where: { id: transactionId, userId }
    });

    if (!transaction) {
        throw new Error('Transaction not found');
    }

    return await prisma.transaction.delete({
        where: { id: transactionId }
    });
};
