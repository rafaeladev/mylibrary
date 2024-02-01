// api/modifyBook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    const existingBook = await prisma.book.findUnique({
      where: { id: data.id },
    });

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

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

    await prisma.book.update({
      where: { id: existingBook.id },
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
        rate: data.rate,
      },
    });

    const authorsArray = Array.isArray(data.authors)
      ? data.authors
      : [data.authors];

    // Supprimer les anciennes relations avec les auteurs
    await prisma.author_Books.deleteMany({
      where: { bookId: existingBook.id },
    });

    for (const authorName of authorsArray) {
      if (authorName && authorName.trim() !== "") {
        const existingAuthor = await prisma.author.findFirst({
          where: { name: authorName.trim() },
        });

        if (existingAuthor) {
          await prisma.author_Books.create({
            data: {
              authorId: existingAuthor.id,
              bookId: existingBook.id,
            },
          });
        } else {
          console.error(
            `L'auteur "${authorName}" n'existe pas dans la base de données.`,
          );
        }
      } else {
        console.error("Le nom de l'auteur ne peut pas être null ou vide.");
      }
    }

    res.status(200).json({ message: "Le livre a été modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification du livre :", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
