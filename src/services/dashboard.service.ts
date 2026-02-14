
import prisma from '../config/database';

export const getDashboardSummary = async (userId: number) => {
    // Aggregate Income
    const totalIncome = await prisma.transaction.aggregate({
        where: {
            userId,
            category: { type: 'INCOME' }
        },
        _sum: { amount: true }
    });

    // Aggregate Expense
    const totalExpense = await prisma.transaction.aggregate({
        where: {
            userId,
            category: { type: 'EXPENSE' }
        },
        _sum: { amount: true }
    });

    const income = Number(totalIncome._sum.amount || 0);
    const expense = Number(totalExpense._sum.amount || 0);

    return {
        totalBalance: income - expense,
        totalIncome: income,
        totalExpense: expense
    };
};

export const getExpenseStats = async (userId: number) => {
    // Group expenses by category
    const stats = await prisma.transaction.groupBy({
        by: ['categoryId'],
        where: {
            userId,
            category: { type: 'EXPENSE' }
        },
        _sum: { amount: true }
    });

    // Fetch category details for names
    const categoryIds = stats.map(s => s.categoryId);
    const categories = await prisma.category.findMany({
        where: { id: { in: categoryIds } }
    });

    // Map category names to stats
    return stats.map(stat => {
        const category = categories.find(c => c.id === stat.categoryId);
        return {
            categoryId: stat.categoryId,
            categoryName: category?.name || 'Unknown',
            totalAmount: Number(stat._sum.amount || 0)
        };
    });
};
