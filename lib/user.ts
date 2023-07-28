import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const isLoggedIn = async () => {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
};

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
