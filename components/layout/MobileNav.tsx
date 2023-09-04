import { Icons } from '../ui/icons';
import { NavLink } from '../ui/NavLink';

export default function MobileNav() {
  return (
    <div className="sticky bottom-0 lg:col-span-1 lg:row-span-4 lg:hidden">
      <nav className="rounded-lg bg-white py-4 lg:h-full">
        <ul className="flex justify-center gap-8 lg:flex lg:flex-col lg:items-center">
          <li>
            <NavLink href="/dashboard" className="px-3 py-6">
              <Icons.home />
            </NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/journal" className="px-3 py-6">
              <Icons.penLine />
            </NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/progress" className="px-3 py-6">
              <Icons.trendingUp />
            </NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/achievements" className="px-3 py-6">
              <Icons.trophy />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
