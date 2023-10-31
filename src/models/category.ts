// models/category.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategory = async () => {
    return prisma.category.findMany();
};
