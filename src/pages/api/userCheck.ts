import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.query;

  try {
    // Trouver l'utilisateur avec l'email donné
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifier si l'utilisateur est l'auteur du livre
    const book = await prisma.book.findFirst({
      where: {
        userId: user.id,
        id: parseInt(req.query.bookId as string),
      },
    });

    if (book) {
      // L'utilisateur est l'auteur du livre
      return res.status(200).json({ isAuthor: true });
    } else {
      // L'utilisateur n'est pas l'auteur du livre
      return res.status(200).json({ isAuthor: false });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
