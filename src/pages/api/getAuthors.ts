// pages/api/getAuthors.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

import { getAuthors } from '../../models/author';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authors = await getAuthors();
        res.status(200).json(authors);
    } catch (error) {
        console.error('Erreur lors de la recherche des auteurs', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
