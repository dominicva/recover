import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LiveDates from './LiveDates';

export default function CurrentStreak() {
  return (
    <Card className="bg-green lg:col-span-2 lg:row-span-1">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4">
        <CardTitle className="text-xl font-normal">Current streak</CardTitle>
        <Link
          href="/dashboard/achievements"
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'ghost',
            }),
            'rounded-full bg-green-2'
          )}
        >
          <ChevronRight color="#000" />
        </Link>
      </CardHeader>
      <LiveDates />
    </Card>
  );
}
