// models/author.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAuthors = async () => {
  return prisma.author.findMany();
};

export const getAuthorsForBook = async (bookId: number) => {
  try {
    const authors = await prisma.author_Books.findMany({
      where: {
        bookId: bookId,
      },
      include: {
        author: true,
      },
    });

    // console.log('Authors for book:', authors);

    return authors.map((auteur_book) => auteur_book.author.name);
  } catch (error) {
    console.error("Error fetching authors for book", error);
    throw error;
  }
};
