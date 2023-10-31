// pages/api/getBookCover.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { bookTitle } = req.query;

    try {
        const response = await axios.get<{
            items: { volumeInfo: { imageLinks: { thumbnail: string } } }[];
        }>('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: bookTitle,
            },
        });

        if (response.data.items && response.data.items.length > 0) {
            const coverUrl = response.data.items[0].volumeInfo.imageLinks.thumbnail;
            res.status(200).json(coverUrl);
        } else {
            res.status(404).json('Aucune information sur le livre trouvée.');
        }
    } catch (error) {
        console.error('Erreur lors de la recherche de la couverture du livre', error);
        res.status(500).json('Erreur interne du serveur.');
    }
};
