import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { ProgressChart } from '../progress';
import { cn } from '@/lib/utils';

export default function YourProgress() {
  return (
    <Card className="flex w-full flex-col items-center justify-between rounded-2xl bg-purple">
      <CardHeader className="flex w-full flex-row justify-between self-start pb-0">
        <div>
          <CardTitle className="font-normal">Your progress</CardTitle>
          <CardDescription>Based on your questionnaires</CardDescription>
        </div>
        <Link
          href="/dashboard/progress"
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'outline',
            }),
            'rounded-full'
          )}
        >
          <ChevronRight />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <ProgressChart />
      </CardContent>
    </Card>
  );
}
