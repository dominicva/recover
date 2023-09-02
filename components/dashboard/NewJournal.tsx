'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Plus } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRevalidate } from '@/hooks/useRevalidate';

export default function NewJournal() {
  const revalidate = useRevalidate();
  const pathname = usePathname();

  const handleClick = async () => {
    // look into using server actions to achieve this
    const response = await fetch('/api/journal', {
      method: 'POST',
    });

    const { data } = await response.json();

    revalidate({
      href: `/dashboard/journal/${data.id}`,
    });
  };

  const className = clsx(
    'flex items-center justify-between rounded-2xl bg-light-gray lg:col-span-2 lg:row-span-1',
    pathname === '/dashboard/journal' && 'bg-purple'
  );

  return (
    <Card className={className}>
      <CardHeader className="px-5">
        <CardTitle className="font-normal">Add new journal entry</CardTitle>
        <CardDescription>Write whatever comes to mind</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 pr-5">
        <Button
          onClick={handleClick}
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'outline',
            }),
            'p-0',
            pathname === '/dashboard/journal'
              ? 'bg-purple-2 hover:bg-purple'
              : 'bg-gray-2'
          )}
        >
          <Plus color="#000" />
        </Button>
      </CardContent>
    </Card>
  );
}
