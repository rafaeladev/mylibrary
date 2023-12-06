// pages/api/getUniqueCategory.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

import { getUniqueCategory } from '../../models/category';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const categoryId = parseInt(req.query.categoryId as string, 10);

        const category = await getUniqueCategory(categoryId);
        res.status(200).json(category);
    } catch (error) {
        console.error('Erreur lors de la recherche du type', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
