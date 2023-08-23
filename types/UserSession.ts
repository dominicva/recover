import type { DefaultSession } from 'next-auth';

export type UserSession = {
  dateOfSobriety: string;
  substanceOfAbuse: string;
  isNewUser: boolean;
  userId: string;
} & DefaultSession['user'];
