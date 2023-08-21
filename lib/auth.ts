import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  // @ts-ignore
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
      // when we get to building the on-boarding, will use trigger to
      // determine when/how to update the user's profile on the session

      /**
       * called when JWT is created. Receives a trigger property which indicates how the JWT was created.
       * If trigger === 'signUp', then the user is new, and we set isNewUser to true.
       * When we access the session from the (dashboard)/new-user page, we can check if the user is new or not.
       * if they are not new, we redirect them to the home page.
       */
      if (trigger === 'signUp') {
        token.isNewUser = true;
      } else {
        token.isNewUser = false;
      }

      // equivalent tp if (token?.email) { ... } but without
      // need to query the database
      if (user) {
        console.log('user', user);
        token.userId = user.id;
      }

      // if (token?.email) {
      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: token?.email,
      //     },
      //   });

      //   token.userId = user?.id;
      // }

      return token;
    },
    async session({ session, token }) {
      /**
       * called when session is created. Receives a session object and a token object.
       * Add the user id to the session object so we can access it across the app.
       */
      // user should always be on the session object
      // if (session.user) {
      // @ts-ignore
      session.user.isNewUser = token.isNewUser;
      // @ts-ignore
      session.user.userId = token.userId;
      // }

      return session;
    },
  },
};
