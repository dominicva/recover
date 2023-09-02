import Link from 'next/link';
import { Plus } from 'react-feather';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

export default function NewQuestionnaire({ pathname }: { pathname?: string }) {
  const className = clsx(
    'flex items-center justify-between rounded-2xl bg-light-gray lg:col-span-2 lg:row-span-1 max-w-sm',
    pathname?.startsWith('/dashboard/journal') && 'bg-purple'
  );

  return (
    <Card className={className}>
      <CardHeader className="px-5">
        <CardTitle className="font-normal">How do you feel today?</CardTitle>
        <CardDescription>Complete a quick questionnaire</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 pr-5">
        <Link
          href="/dashboard/questionnaire"
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'outline',
            }),
            'rounded-full bg-gray-2',
            pathname?.startsWith('/dashboard/journal') &&
              'bg-purple-2 hover:bg-purple'
          )}
        >
          <Plus color="#000" />
        </Link>
      </CardContent>
    </Card>
  );
}
