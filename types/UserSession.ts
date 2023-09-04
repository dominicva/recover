import type { DefaultSession } from 'next-auth';

export type UserSession = {
  id: string;
  name: string;
  email: string;
  dateOfSobriety: string;
  substanceOfAbuse: string;
  isNewUser: boolean;
  userId: string;
};
