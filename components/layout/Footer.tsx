import Link from 'next/link';
import { Icons } from '../ui/icons';

export default function Footer() {
  return (
    <footer className="sticky -bottom-1">
      <nav className="rounded-lg bg-gray-100 py-6">
        <ul className="flex justify-center gap-14">
          <li>
            <Link href="/dashboard">
              <Icons.home />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/journal">
              <Icons.alignLeft />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/progress">
              <Icons.barChart />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/achievements">
              <Icons.trophy />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
