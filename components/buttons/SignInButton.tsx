import Link from 'next/link';
import Button from './Button';

export default function SignInButton() {
  return (
    <Link href="/signin">
      <Button size="small" intent="text">
        Sign in
      </Button>
    </Link>
  );
}
