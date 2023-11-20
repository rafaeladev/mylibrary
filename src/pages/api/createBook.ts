// api/createBook.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const data = req.body;
        console.log('les auteurs que lAPI reçoit', data.authors);

        const typeData = {
            name: data.type,
        };

        const existingType = await prisma.type.findFirst({
            where: {
                name: data.type,
            },
        });

        const typeId = existingType
            ? existingType.id
            : (await prisma.type.create({ data: typeData })).id;

        const categoryData = {
            name: data.category,
        };

        const existingCategory = await prisma.category.findFirst({
            where: {
                name: data.category,
            },
        });

        const categoryId = existingCategory
            ? existingCategory.id
            : (await prisma.category.create({ data: categoryData })).id;

        console.log('Avant la requête à la base de données');
        const createdBook = await prisma.book.create({
            data: {
                title: data.title,
                image: data.imgUrl,
                description: data.description,
                type: {
                    connect: { id: typeId },
                },
                category: {
                    connect: { id: categoryId },
                },
                status: data.status,
                favorite: data.favorite,
                // userId:SessionId()
            },
        });
        console.log('Après la requête à la base de données');

        const authorsArray = Array.isArray(data.authors) ? data.authors : [data.authors];

        for (const authorName of authorsArray) {
            if (authorName && authorName.trim() !== '') {
                const existingAuthor = await prisma.author.findFirst({
                    where: { name: authorName.trim() },
                });
                console.log('existing author', existingAuthor);

                if (existingAuthor) {
                    console.log('new autor Books:'),
                        await prisma.author_Books.create({
                            data: {
                                authorId: existingAuthor.id,
                                bookId: createdBook.id,
                            },
                        });
                } else {
                    console.error(`L'auteur "${authorName}" n'existe pas dans la base de données.`);
                }
            } else {
                console.error("Le nom de l'auteur ne peut pas être null ou vide.");
            }
        }

        const savedBook = await prisma.book.findUnique({
            where: {
                id: createdBook.id,
            },
        });

        res.status(200).json({ message: 'Le livre a été enregistré avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la création du livre :', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
