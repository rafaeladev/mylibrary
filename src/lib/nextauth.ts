import { getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    secret: process.env.AUTH_SECRET || '12345', // Ajoutez cette ligne
    callbacks: {
        session({ session, user }: any) {
            if (!session.user) return session;

            session.user.id = user.id;
            return session;
        },
    },
};

export const getAuthSession = async () => {
    const authSession = await getServerSession(authOptions);
    return authSession;
};
