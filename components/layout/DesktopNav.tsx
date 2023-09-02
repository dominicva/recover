import { Icons } from '../ui/icons';
import { NavLink } from '../ui/NavLink';

export default function DesktopNav() {
  return (
    <div className="sticky -bottom-1 hidden lg:col-span-1 lg:row-span-4 lg:block">
      <nav className="flex items-start justify-center rounded-lg py-6 lg:h-full">
        <ul className="mt-14 flex flex-col  justify-center gap-12">
          <li>
            <NavLink
              href="/dashboard"
              activePathname="/dashboard"
              className="justify-start"
            >
              <Icons.home /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/dashboard/journal"
              activePathname="/dashboard/journal"
              className="justify-start"
            >
              <Icons.penLine /> <span>Journal</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/dashboard/progress"
              activePathname="/dashboard/progress"
              className="justify-start"
            >
              <Icons.trendingUp /> <span>Progress</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/dashboard/achievements"
              activePathname="/dashboard/achievements"
              className="justify-start"
            >
              <Icons.trophy /> <span>Achievements</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
