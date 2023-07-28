import Link from 'next/link';
import Button from './Button';

export default function LoginButton() {
  return (
    <Link href="/signin">
      <Button size="small" intent="text">
        Login
      </Button>
    </Link>
  );
}
