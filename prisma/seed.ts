import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const categoryData: Prisma.CategoryCreateInput[] = [
//     {
//         name: 'Roman',
//     },
//     {
//         name: 'SF',
//     },
//     {
//         name: 'Horreur',
//     },
//     {
//         name: 'Humour',
//     },
//     {
//         name: 'Civilisation',
//     },
//     {
//         name: 'Sience',
//     },
//     {
//         name: 'Historique',
//     },
//     {
//         name: 'Fantaisie',
//     },
// ];

async function main() {
    // console.log(`Start seeding ...`);
    // for (const u of categoryData) {
    //     const category = await prisma.category.create({
    //         data: u,
    //     });
    //     console.log(`Created category with id: ${category.id}`);
    // }

    // console.log(`Seeding finished.`);
    await prisma.type.create({
        data: { name: 'BD' },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
