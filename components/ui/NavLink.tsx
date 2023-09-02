'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './button';
import { cn } from '@/lib/utils';

export function NavLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();

  const classes = cn(
    buttonVariants({
      size: 'sm',
      variant: 'ghost',
    }),
    className,
    'flex items-center gap-2',
    href === pathname && 'bg-black text-white rounded-lg'
  );

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
