import Link from 'next/link';
import SigninButton from '../ui/buttons/SignInButton';
import SignOutButton from '../ui/buttons/SignOutButton';
import Container from '@/components/ui/Container';

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Container as="header" className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-semibold text-purple-darker">
        <Link href={isLoggedIn ? '/dashboard' : '/'}>Recover</Link>
      </h1>
      <nav>
        <ul>
          <li>{isLoggedIn ? <SignOutButton /> : <SigninButton />}</li>
        </ul>
      </nav>
    </Container>
  );
}
