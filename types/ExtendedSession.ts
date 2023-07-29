import type { Session } from 'next-auth';
import type { UserSession } from './UserSession';

export type ExtendedSession = Session & UserSession;
