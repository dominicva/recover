'use client';

import MobileNav from '@/components/layout/MobileNav';
import DesktopNav from '@/components/layout/DesktopNav';
import { useViewport } from '@/hooks/useViewport';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useViewport();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 p-3 lg:grid-cols-6 lg:grid-rows-3">
      {width > 1024 && <DesktopNav />}
      {children}
      {width < 1024 && <MobileNav />}
    </div>
  );
}
