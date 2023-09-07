import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function SelfMotivation() {
  return (
    <Card className="rounded-2xl bg-blue lg:col-span-5 lg:row-span-1">
      <div className="flex items-center justify-between">
        <CardHeader className="px-5">
          <CardDescription>I need some encouragement</CardDescription>
          <CardTitle className="font-normal">Your self motivation</CardTitle>
        </CardHeader>
        <CardContent className="pb-0 pr-5">
          <Link
            href="/dashboard/motivation"
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'outline',
              }),
              'rounded-full border bg-blue-2',
              'hover:bg-blue'
            )}
          >
            <ChevronRight />
          </Link>
        </CardContent>
      </div>
      <Link
        className={cn(
          buttonVariants({
            size: 'lg',
          }),
          'mb-4 ml-5 w-52'
        )}
        href={'/dashboard/motivation'}
      >
        Get encouragement
      </Link>
      <CardFooter>
        <p className="text-body-text">
          Create notes and other media for your future self
        </p>
      </CardFooter>
    </Card>
  );
}
