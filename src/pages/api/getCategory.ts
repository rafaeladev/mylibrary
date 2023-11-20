// pages/api/getCategory.ts
import { NextApiRequest, NextApiResponse } from 'next';
//import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaClient } from '../../../prisma/.prisma/client';
const prisma = new PrismaClient();

import { getCategory } from '../../models/category';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const category = await getCategory();
        res.status(200).json(category);
    } catch (error) {
        console.error('Erreur lors de la recherche des auteurs', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
