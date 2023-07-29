import Link from 'next/link';
import SigninButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';
import Container from '@/components/utils/Container';

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Container as="header" className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-semibold text-purple-darker">
        <Link href="/">Recovery</Link>
      </h1>
      <nav>
        <ul>
          <li>{isLoggedIn ? <SignOutButton /> : <SigninButton />}</li>
        </ul>
      </nav>
    </Container>
  );
}
