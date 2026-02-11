
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { RegisterDTO, LoginDTO } from '../utils/dto'; // We will create this

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const registerUser = async (data: RegisterDTO) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
        },
    });

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return { user: { id: user.id, email: user.email, name: user.name }, token };
};

export const loginUser = async (data: LoginDTO) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return { user: { id: user.id, email: user.email, name: user.name }, token };
};

export const getUserProfile = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, createdAt: true }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};
