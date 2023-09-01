import Link from 'next/link';
import { Icons } from '../ui/icons';

export default function MobileNav() {
  return (
    <div className="sticky -bottom-1 lg:col-span-1 lg:row-span-4 lg:hidden">
      <nav className="rounded-lg bg-gray-100 py-6 lg:h-full">
        <ul className="flex justify-center gap-14 lg:flex lg:flex-col lg:items-center">
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
    </div>
  );
}
