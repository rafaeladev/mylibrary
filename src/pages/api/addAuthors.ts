// Importez les dépendances nécessaires
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Définissez la fonction de gestionnaire pour l'ajout d'un nouvel auteur
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { name }: { name: string } = req.body;

      // console.log("Nom de l'auteur reçu :", name);

      const existingAuthor = null; // Aucune vérification nécessaire si vous êtes sûr que l'auteur n'existe pas

      // Ajoutez l'auteur à la base de données

      if (!existingAuthor) {
        // console.log("L'auteur n'existe pas, ajout à la base de données...");

        const newAuthor = await prisma.author.create({
          data: { name },
        });

        // console.log("Auteur ajouté avec succès :", newAuthor);

        return res.status(201).json(newAuthor);
      } else {
        // L'auteur existe déjà, renvoyez une réponse appropriée
        // console.log("L'auteur existe déjà :", existingAuthor);

        return res.status(200).json(existingAuthor);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de l'auteur à la base de données",
        error,
      );
      return res
        .status(500)
        .json({ error: "Erreur serveur lors de l'ajout de l'auteur" });
    }
  }

  // Méthode non autorisée
  return res.status(405).json({ error: "Méthode non autorisée" });
}
