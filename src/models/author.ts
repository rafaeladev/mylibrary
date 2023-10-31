// models/author.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAuthors = async () => {
    return prisma.author.findMany();
};
