'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Plus } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NewJournal() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleClick = async () => {
    const response = await fetch('/api/journal', {
      method: 'POST',
    });

    const { data } = await response.json();

    startTransition(() => {
      router.refresh();
      router.push(`/dashboard/journal/${data.id}`);
    });
  };

  return (
    <Card className="flex items-center justify-between rounded-2xl bg-gray-100">
      <CardHeader className="pr-0">
        <CardTitle className="font-normal">Add new journal entry</CardTitle>
        <CardDescription>Write whatever comes to mind</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Button
          onClick={handleClick}
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'outline',
            }),
            'p-0'
          )}
        >
          <Plus color="#000" />
        </Button>
      </CardContent>
    </Card>
  );
}
