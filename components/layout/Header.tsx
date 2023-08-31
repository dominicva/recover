import Link from 'next/link';
import Container from '@/components/ui/Container';
import { buttonVariants } from '@/components/ui/button';
import UserAvatar from './UserAvatar';
import { getUserSession } from '@/lib/user';

export default async function Header() {
  const userSession = await getUserSession();

  return (
    <Container as="header" className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-semibold text-purple-darker">
        <Link href="/">Recover</Link>
      </h1>

      <nav>
        {userSession ? (
          <UserAvatar userSession={userSession} />
        ) : (
          <Link href="/signin" className={buttonVariants({ variant: 'link' })}>
            Sign In
          </Link>
        )}
      </nav>
    </Container>
  );
}
