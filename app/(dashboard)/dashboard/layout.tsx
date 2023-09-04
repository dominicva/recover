import MobileNav from '@/components/layout/MobileNav';
import DesktopNav from '@/components/layout/DesktopNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 p-3 lg:grid-cols-6 lg:grid-rows-3">
        <DesktopNav />
        {children}
      </div>
      <MobileNav />
    </>
  );
}
