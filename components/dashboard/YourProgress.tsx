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
    <Card className="flex w-full flex-col items-center justify-between rounded-2xl bg-purple lg:col-span-3 lg:row-span-3">
      <CardHeader className="flex w-full flex-row justify-between self-start px-5 pb-0">
        <div>
          <CardTitle className="mb-2 text-2xl font-normal">
            Your progress
          </CardTitle>
          <CardDescription className=" text-body-text">
            Based on your questionnaires
          </CardDescription>
        </div>
        <Link
          href="/dashboard/progress"
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'outline',
            }),
            'rounded-full bg-purple-2 hover:bg-purple'
          )}
        >
          <ChevronRight />
        </Link>
      </CardHeader>
      <CardContent className="self-start px-5 lg:self-center">
        <ProgressChart />
      </CardContent>
    </Card>
  );
}
