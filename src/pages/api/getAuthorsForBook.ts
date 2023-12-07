// pages/api/getAuthorsForBook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { getAuthorsForBook } from '../../models/author';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const bookId = parseInt(req.query.bookId as string, 10); // Assurez-vous que vous utilisez bookId au lieu de categoryId
        const authors = await getAuthorsForBook(bookId); // Utilisez la fonction correcte

        res.status(200).json(authors);
    } catch (error) {
        console.error('Erreur lors de la recherche des auteurs', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
