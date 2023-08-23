import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <div className="px-4 pt-12">
      <h2 className="mb-6 text-center text-2xl font-medium">
        Congratulations!
      </h2>
      <p className="mb-6 text-center">Let&apos;s get your journey started.</p>
      <Link
        href="/dashboard"
        className={buttonVariants({ size: 'lg', className: 'w-full' })}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
