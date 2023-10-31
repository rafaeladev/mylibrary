import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// ADD Book /api/post
// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//     const { title, description, favorite, status } = req.body;

//     const session = await getSession({ req });
//     if (session) {
//         const result = await prisma.book.create({
//             data: {
//                 title: title,
//                 description: description,
//                 favorite: favorite,
//                 status: status,
//                 user: { connect: { email: session?.user?.email } },
//             },
//         });
//         res.json(result);
//     } else {
//         res.status(401).send({ message: 'Unauthorized' });
//     }
// }
