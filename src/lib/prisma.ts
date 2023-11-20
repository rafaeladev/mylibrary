//import { PrismaClient } from '@prisma/client';

import { PrismaClient } from '../../prisma/prisma/client';
//const prisma = new PrismaClient();

// const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

export default prisma;
