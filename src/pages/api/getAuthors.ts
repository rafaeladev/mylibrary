// pages/api/getAuthors.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

import { getAuthors } from "../../models/author";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filter = req.query.filter as string | undefined;

    if (filter) {
      // Search for the pattern "author:[ID]"
      const authorMatch = filter.match(/author:(\d+)/);

      // Extract the ID from the match
      const filterId = authorMatch ? parseInt(authorMatch[1], 10) : null;

      let authors;
      let books;
      if (filterId !== null) {
        // console.log(filterId);
        books = await prisma.author_Books.findMany({
          where: { authorId: filterId },
        });
      } else {
        authors = null; // Handle the case where filterId is null
      }

      res.status(200).json(books);
    } else {
      const authors = await getAuthors();
      res.status(200).json(authors);
    }
  } catch (error) {
    console.error("Erreur lors de la recherche des auteurs", error);
    res.status(500).json("Erreur interne du serveur.");
  }
};
