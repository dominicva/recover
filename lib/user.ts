import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { UserSession, ExtendedSession } from '@/types';

export const isLoggedIn = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
};

export const getUser = async (): Promise<UserSession> => {
  const session = (await getServerSession(authOptions)) as ExtendedSession;
  return session?.user;
};

export const isNewUser = async (): Promise<boolean> => {
  const session = (await getServerSession(authOptions)) as ExtendedSession;

  return session?.user?.isNewUser;
};
