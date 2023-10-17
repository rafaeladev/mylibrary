import GitHubProvider from 'next-auth/providers/github';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' },
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email:',
                    type: 'email',
                    placeholder: 'hello@example.com',
                },
                password: {
                    label: 'Password:',
                    type: 'password',
                    placeholder: 'your-awesome-password',
                },
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: '42', name: 'Dave', email: 'test@test.com' };
                return user;

                // if (credentials?.email === user.email && credentials?.password === user.password) {
                //     return user;
                // } else {
                //     return null;
                // }
            },
        }),
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
