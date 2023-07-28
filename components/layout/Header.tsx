import Link from 'next/link';
import Button from '../buttons/Button';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-semibold text-purple-darker">Recover</h1>
      <nav>
        <ul>
          <li>
            <Link href="/signin">
              <Button size="small" intent="text">
                Log in
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
