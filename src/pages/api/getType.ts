// pages/api/getType.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

import { getType } from '../../models/type';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const type = await getType();
        res.status(200).json(type);
    } catch (error) {
        console.error('Erreur lors de la recherche des types', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
