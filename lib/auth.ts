// @ts-nocheck
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/verify-request',
    newUser: '/new-user',
  },
  callbacks: {
    async jwt({ token, trigger, user }) {
      if (trigger === 'signUp') {
        token.isNewUser = true;
      } else {
        token.isNewUser = false;
      }

      if (trigger === 'update') {
        const user = await prisma.user.findUnique({
          where: { id: token.userId },
        });

        token.name = user.name;
        token.email = user.email;
        token.substanceOfAbuse = user.substanceOfAbuse;
        token.dateOfSobriety = user.dateOfSobriety;
      }

      if (user) {
        token.userId = user.id;
        token.substanceOfAbuse = user.substanceOfAbuse;
        token.dateOfSobriety = user.dateOfSobriety;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.isNewUser = token.isNewUser;
      session.user.userId = token.userId;
      session.user.substanceOfAbuse = token.substanceOfAbuse;
      session.user.dateOfSobriety = token.dateOfSobriety;

      return session;
    },
  },
};
