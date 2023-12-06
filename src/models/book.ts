// models/book.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBooks = async () => {
    return prisma.book.findMany();
};
