import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 pt-12">
      <h2 className="mb-6 text-center text-4xl font-medium">
        Congratulations!
      </h2>
      <p className="mb-12 text-center">Let&apos;s get your journey started.</p>
      <Link
        href="/dashboard"
        className={buttonVariants({
          size: 'lg',
          className: 'mx-auto block w-11/12 max-w-[200px]',
        })}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
