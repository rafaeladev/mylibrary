import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

import { getBooks } from '../../models/book';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const books = await getBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('Erreur lors de la recherche des livres', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
