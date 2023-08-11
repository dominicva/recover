'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../buttons/Button';

export default function CreateNewEntryButton() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleClick = async () => {
    const res = await fetch('/api/journal', {
      method: 'POST',
    });
    const { data } = await res.json();
    startTransition(() => {
      router.refresh();
      router.push(`/dashboard/journal/${data.id}`);
    });
  };

  return (
    <Button onClick={handleClick} size="large" className="h-16 w-56">
      Create new entry
    </Button>
  );
}
