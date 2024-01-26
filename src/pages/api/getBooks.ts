import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

import { getBooks } from "../../models/book";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { filterBy } = req.query;
    console.log(filterBy);
    let books;
    if (filterBy) {
      const ids = (typeof filterBy === "string" ? filterBy : "")
        .split(",")
        .map((id) => parseInt(id, 10));

      console.log("ids", ids);

      books = await prisma.book.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } else {
      books = await prisma.book.findMany();
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Erreur lors de la recherche des livres", error);
    res.status(500).json("Erreur interne du serveur.");
  }
};
