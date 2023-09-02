import Link from 'next/link';
import { Icons } from '../ui/icons';

export default function MobileNav() {
  return (
    <div className="sticky -bottom-1 lg:col-span-1 lg:row-span-4 lg:hidden">
      <nav className="rounded-lg bg-gray-100 py-6 lg:h-full">
        <ul className="flex justify-center gap-12 lg:flex lg:flex-col lg:items-center">
          <li>
            <Link href="/dashboard" className="block p-1">
              <Icons.home />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/journal" className="block p-1">
              <Icons.alignLeft />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/progress" className="block p-1">
              <Icons.barChart />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/achievements" className="block p-1">
              <Icons.trophy />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
