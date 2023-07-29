import type { DefaultSession } from 'next-auth';

export type UserSession = DefaultSession['user'] & {
  isNewUser: boolean;
  userId: string;
};
