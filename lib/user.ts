import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from './db';
import type { ExtendedUserSession } from '@/types';

export const getUserSession = async () => {
  const session = (await getServerSession(authOptions)) as ExtendedUserSession;
  return session?.user as any;
};

export const getUserFromDb = async () => {
  const session = await getUserSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  return user;
};

export const getUserWithEntries = async () => {
  const session = await getUserSession();
  if (!session) return null;

  const userWithEntries = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    include: {
      journalEntries: true,
    },
  });

  return userWithEntries;
};

export const isLoggedIn = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
};

export const isNewUser = async (): Promise<boolean> => {
  const session = (await getServerSession(authOptions)) as any;

  return session?.user?.isNewUser;
};
