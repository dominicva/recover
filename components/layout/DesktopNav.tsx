import Link from 'next/link';
import { Icons } from '../ui/icons';

export default function DesktopNav() {
  return (
    <div className="sticky -bottom-1 hidden lg:col-span-1 lg:row-span-4 lg:block">
      <nav className="flex items-start justify-center rounded-lg py-6 lg:h-full">
        <ul className="mt-14 flex flex-col  justify-center gap-14">
          <li>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Icons.home /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/journal" className="flex items-center gap-2">
              <Icons.alignLeft /> <span>Journal</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/progress"
              className="flex items-center gap-2"
            >
              <Icons.barChart /> <span>Progress</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/achievements"
              className="flex items-center gap-2"
            >
              <Icons.trophy /> <span>Achievements</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
