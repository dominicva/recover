'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';
import { Icons } from './icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={router.back}
      variant="secondary"
      className="flex w-24 gap-1 pl-3"
    >
      <Icons.arrowLeft />
      <span>Back</span>
    </Button>
  );
}
