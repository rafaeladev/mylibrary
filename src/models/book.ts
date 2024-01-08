// models/book.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBooks = async (filterBy?: number[]) => {
    if (filterBy && filterBy.length > 0) {
        return await prisma.book.findMany({
            where: {
                id: {
                    in: filterBy,
                },
            },
        });
    } else {
        // Si aucun filtre n'est fourni, récupérer tous les livres
        return await prisma.book.findMany();
    }
};
