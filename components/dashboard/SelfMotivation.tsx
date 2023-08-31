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
    <Card className="rounded-2xl bg-blue">
      <div className="flex items-center justify-between">
        <CardHeader className="px-5">
          <CardDescription>I need some encouragement</CardDescription>
          <CardTitle className="font-normal">Your self motivation</CardTitle>
        </CardHeader>
        <CardContent className="pb-0 pr-5">
          <Link
            href="/dashboard"
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
        </CardContent>
      </div>
      <Button size="lg" className="mb-4 ml-5 block w-40">
        Create
      </Button>
      <CardFooter>
        <p className="text-body-text">
          Record video or audio for your future self. Remember why you started
          this journey.
        </p>
      </CardFooter>
    </Card>
  );
}
