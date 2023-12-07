// models/book.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBooks = async (filterBy?: string) => {
    if (filterBy) {
        console.log('Filter By:', filterBy); // Vérifiez si la fonction est appelée avec le bon filtre
        const filterParts = filterBy.split(':');
        console.log('Filter Parts:', filterParts); // Vérifiez les parties du filtre

        // Vérifiez si la chaîne est correctement formatée
        if (filterParts.length === 2) {
            const filterField = filterParts[0];
            console.log('Filter Field:', filterField);
            const filterValue = parseInt(filterParts[1], 10);
            console.log('Filter Value:', filterValue);

            if (filterField === 'category') {
                return await prisma.book.findMany({
                    where: {
                        categoryId: filterValue,
                    },
                });
            }
            // Ajoutez d'autres conditions pour d'autres filtres si nécessaire
        } else {
            console.error('Chaîne de filtre incorrecte:', filterBy);
        }
    } else {
        // Si aucun filtre n'est fourni, récupérer tous les livres
        return await prisma.book.findMany();
    }
};
