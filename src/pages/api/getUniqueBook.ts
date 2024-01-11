// pages/api/getUniqueType.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

import { getUniqueBook } from '../../models/book';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const bookId = parseInt(req.query.bookId as string, 10);
        const book = await getUniqueBook(bookId);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json('Erreur interne du serveur.');
    }
};
