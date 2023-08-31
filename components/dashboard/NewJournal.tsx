'use client';

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
