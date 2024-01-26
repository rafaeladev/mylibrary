import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getBooks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { categoryId, typeId, authorId } = req.query;

    const books = await prisma.book.findMany({
      where: {
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        typeId: typeId ? parseInt(typeId as string) : undefined,
        authors: {
          some: {
            authorId: authorId ? parseInt(authorId as string) : undefined,
          },
        },
      },
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Erreur lors de la recherche des livres", error);
    res.status(500).json("Erreur interne du serveur.");
  }
};

export default getBooks;
