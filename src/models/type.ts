// models/type.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getType = async () => {
    return prisma.type.findMany();
};

export const getUniqueType = async (typeId: number) => {
    return prisma.type.findUnique({ where: { id: typeId } });
};
