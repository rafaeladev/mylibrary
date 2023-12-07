// pages/api/getBooks.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { getBooks } from '../../models/book';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { filterBy } = req.query;
        const books = await getBooks(filterBy as string);
        res.status(200).json(books);
    } catch (error) {
        console.error('Erreur lors de la recherche des livres', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
