import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
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
          <Avatar>
            <AvatarImage
              src={userSession?.image}
              alt={userSession?.user?.name ?? 'User avatar'}
            />
            <AvatarFallback className="bg-neutral-2"></AvatarFallback>
          </Avatar>
        ) : (
          <Link href="/signin" className={buttonVariants({ variant: 'link' })}>
            Sign In
          </Link>
        )}
      </nav>
    </Container>
  );
}
