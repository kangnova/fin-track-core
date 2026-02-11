
import prisma from '../config/database';

export const createCategory = async (userId: number, name: string, type: 'INCOME' | 'EXPENSE') => {
    return await prisma.category.create({
        data: {
            userId,
            name,
            type
        }
    });
};

export const getCategories = async (userId: number) => {
    return await prisma.category.findMany({
        where: { userId },
        orderBy: { name: 'asc' }
    });
};

export const deleteCategory = async (userId: number, categoryId: number) => {
    const category = await prisma.category.findFirst({
        where: { id: categoryId, userId }
    });

    if (!category) {
        throw new Error('Category not found');
    }

    return await prisma.category.delete({
        where: { id: categoryId }
    });
};
