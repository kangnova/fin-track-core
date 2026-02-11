
import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;

export const createCategorySchema = z.object({
    name: z.string().min(1),
    type: z.enum(['INCOME', 'EXPENSE']),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;

export const createTransactionSchema = z.object({
    categoryId: z.number().int().positive(),
    amount: z.number().positive(),
    date: z.string().datetime(), // ISO 8601 string
    note: z.string().optional(),
});

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
