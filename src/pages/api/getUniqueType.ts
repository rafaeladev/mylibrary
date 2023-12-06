// pages/api/getUniqueType.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

import { getUniqueType } from '../../models/type';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const typeId = parseInt(req.query.typeId as string, 10);

        const type = await getUniqueType(typeId);
        res.status(200).json(type);
    } catch (error) {
        console.error('Erreur lors de la recherche du type', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
